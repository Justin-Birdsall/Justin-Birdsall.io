document.addEventListener("DOMContentLoaded", function() {
    // Get WebGL context
    var canvas = document.getElementById('glCanvas');
    var gl = canvas.getContext('webgl');

    // Load shaders
    Promise.all([
        loadShader('vertexShader.glsl'),
        loadShader('fragmentShader.glsl')
    ]).then(function(shaders) {
        // Create program with the loaded shaders
        var program = glgx3d.createProgram(gl, shaders[0], shaders[1]);
        gl.useProgram(program);

        // Use the program for rendering...
    }).catch(function(error) {
        console.error('Error loading shaders:', error);
    });
});

function loadShader(url) {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load shader');
            }
            return response.text();
        });
}
