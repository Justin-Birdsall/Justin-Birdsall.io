#version 300 es
precision highp float;

const float PI = 3.141592653589793;

float rotate2D(float angle) {
    return mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
}

out vec4 outColor; // Output color variable

void main() {
    vec2 FC = gl_FragCoord.xy;
    vec2 resolution = vec2(640.0, 480.0); // Adjust according to canvas size
    vec2 r = resolution.xy;
    float t = 0.0;
    float o = 0.0;
    
    for (float i = 0.0; i < 90.0; i++) {
        float e;
        float a;
        float w;
        float x;
        float g = 0.0;
        float h;
        
        vec2 p = vec2((FC.xy - 0.5 * r) / r.y * g + 2.0, g);
        p.yz *= rotate2D(0.5);
        e = p.y;
        h = e + p.x * 0.3;
        p.z += t;
        
        for (a = 0.6; a > 0.001; a *= 0.7) {
            p.xz *= rotate2D(5.0);
            x = (p.x + p.z) / a + t + t;
            e -= w = exp(sin(x) - 3.0) * a;
            h += abs(dot(sin(p.xz / a * 0.3) * a, r / r));
        }
        g += min(e, h * 0.5 - 1.0);
        o += 0.01 - 0.02 / exp(max(sin(i), e) * 3000.0) / h;
    }
    
    // Output color assignment
    outColor = vec4(o);
}
