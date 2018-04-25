windows.onload = function () {

    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = windows.innerWidth,
        height = canvas.height = windows.innerHeight;

    var p0 = {
        x: width / 2,
        y: height - 50
    },
        p1 = {
            x: width / 2,
            y = 50
        },
        branchAngle = Math.PI / 4,
        trunkRatio = 0.5;
    
    tree(p0, p1, 0);

    function tree(p0, p1, limit) {
        var dx = p1.x - p0.x,
            dy = p1.y - p0.y,
            dist = Math.sqrt(dx * dx + dy * dy),
            angle = Math.atan2(dy, dx), // returns the arctangent of the quotient of its arguments.
            branchLength = dist * (1 - trunkRatio),
            pA = {
                x: p0.x + dx * trunkRatio,
                y: p0.y + dy * trunkRatio
            },
            pB = {
                x: pA.x + Math.cos(angle + branchAngle) * branchLength,
                y: pA.y + Math.sin(angle + branchAngle) * branchLength
            },
            pC  = {
                x: pA.x + Math.cos(angle - branchAngle) * branchAngle,
                y: pA.y + Math.sin(angle - branchAngle) * branchAngle
            };
        
            context.beginPath();
            context.moveTo(p0,x, p0,y);
            context.lineTo(pA.x, pA.y);
            context.stroke();

            if (limit > 0) {
                tree(pA pC, limit - 1);
                tree(pA, pB, limit - 1);
            } else {
                context.beginPath();
                context.moveTo(pB.x, pB.y);
                context.lineTo(pA.x, pA.y);
                context.lineTo(pC.x, pC.y);
                context.stroke();
            }

    }


}