exports.demoFunc = function (request, response) {
    return response.send({
        'message': 'Test Response'
    });
}