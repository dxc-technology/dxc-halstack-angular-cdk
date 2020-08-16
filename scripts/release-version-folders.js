const { exec } = require("child_process");
const AWS = require("aws-sdk");
const BUCKET_NAME = "design-system-angular-cdk-site";
const DIRECTORY = "tools/angular/";


const getVersionsInS3Bucket = async () => {
    const params = {
      Bucket: BUCKET_NAME,
      Prefix: DIRECTORY,
      Delimiter: "/",
    };
  
    return new Promise((resolve, reject) => {
      new AWS.S3().listObjectsV2(params, (error, data) => {
        if (error) {
          reject(new Error(error));
        } else {
          resolve(processListObjectsResponse(data));
        }
      });
    });
  };

  const processListObjectsResponse = (response) => {
    return response.CommonPrefixes.map((commonPrefix) => {
      const prefix = commonPrefix.Prefix;
      return prefix.substring(
        prefix.lastIndexOf(DIRECTORY) + DIRECTORY.length,
        prefix.length - 1
      );
    })
      .filter((version) => version !== "next" && version !== "latest")
      .map((version) => Number(version));
  };


  const updateReleaseVersionsFile = (currentVersion, versions) => {

    return new Promise((resolve, reject) => {
      exec(
        `echo '${JSON.stringify(versions)}' | aws s3 cp - s3://${BUCKET_NAME}/${DIRECTORY}${currentVersion}/assets/versions.json`,
        (error, stdout, stderr) => {
          if (error) {
            throw new Error(error.message);
          }
          if (stderr) {
            throw new Error(stderr);
          }
          resolve(stdout);
        }
      );
    });
  };

  const listReleaseVersions = async () => {

    const currentReleaseVersion = process.argv[2];
    const existingVersionsInBucket = await getVersionsInS3Bucket();

    const versions = existingVersionsInBucket.map((version) => {
        let current = false;
        if (version === Number(currentReleaseVersion)){
            current = true;
        }
        return {current : current, version: version };
    });

    if (versions !== null && versions.length > 0){
      await updateReleaseVersionsFile(currentReleaseVersion,  versions);
    }else{
        console.info('Not release versions are available');
    }
  };

listReleaseVersions();
