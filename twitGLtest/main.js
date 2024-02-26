let gl;
let program;

function init() {
    const canvas = document.getElementById('canvas');
    gl = canvas.getContext('webgl');
    if (!gl) {
        console.error('WebGL not supported');
        return;
    }

    const vertexShaderSource = `
        void main() {
            gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
        }
    `;

    const fragmentShaderSource = `
        precision mediump float;
        uniform float time;
        uniform vec2 resolution;

        float snoise2D(vec2 co){
            return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
        }

        vec2 rotate2D(vec2 v, float a){
            return vec2(v.x * cos(a) - v.y * sin(a), v.x * sin(a) + v.y * cos(a));
        }

        void main() {
            vec2 fragCoord = gl_FragCoord.xy;
            float o = 0.0;
            for(float e=0.0,i=0.0,a=0.0,w=0.0,x=0.0,g=0.0,h=0.0;i++<90.0;o+=0.01-.02/exp(max(s,e)*3e3)/h){
                vec3 p=vec3((fragCoord-.5*resolution)/resolution.y*g+2.,g);
                p.zy*=rotate2D(vec2(0.0, 1.0), 0.5);
                e=p.y;h=e+p.x*0.3;p.z+=time;
                for(a=0.6;a>0.001;a*=0.7){
                    p.xz*=rotate2D(vec2(1.0, 0.0), 5.0);
                    x=(p.x+p.z)/a+time+time;
                    e-=w=exp(sin(x)-3.)*a;
                    h+=abs(dot(sin(p.xz/a*0.3)*a, resolution/resolution));
                }
                g+=e=min(e,h*0.5-1.);
            }
            gl_FragColor = vec4(vec3(o), 1.0);
        }
    `;

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    program = createProgram(gl, vertexShader, fragmentShader);

    gl.useProgram(program);

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    const timeUniformLocation = gl.getUniformLocation(program, 'time');
    const resolutionUniformLocation = gl.getUniformLocation(program, 'resolution');

    gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

    let startTime = Date.now();

    function render() {
        let currentTime = Date.now();
        let deltaTime = (currentTime - startTime) * 0.001;
        startTime = currentTime;

        gl.uniform1f(timeUniformLocation, deltaTime);

        gl.drawArrays(gl.TRIANGLES, 0, 3);

        requestAnimationFrame(render);
    }

    render();
}

function createShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Error compiling shader:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }

    return shader;
}

function createProgram(gl, vertexShader, fragmentShader) {
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Error linking program:', gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        return null;
    }

    return program;
}

init();
