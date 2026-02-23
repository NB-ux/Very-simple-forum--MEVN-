var PostModel = require('./models/Post');

module.exports.createPostDBService = (postData) => {

    return new Promise(function postFn(resolve, reject){

        var modeldata = new PostModel();

        modeldata.title = postData.title;
        modeldata.content = postData.content;
        modeldata.userId = postData.userId;
        modeldata.createdAt = new Date();

        modeldata.save(function resultHandle(error, result) {
 
            if (error) {
                reject(false);
            } else {
                resolve(true);
            }
        });
    });
}