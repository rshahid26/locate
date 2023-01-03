'use strict';

function balancedOrNot(expressions, maxReplacements) {

    for (let i = 0; i < expressions.length; i++) {

        let greaterSignDiff = 0;
        for (let left = 0; left < expressions[i].length; left++) {

            if (expressions[i][(expressions[i].length - 1) - left] === '>') {
                if ((expressions[i].match(/</g) || []).length === 0) greaterSignDiff++;

                if (expressions[i].indexOf('<') > 0) expressions[i] = 0;
                else expressions[i] = expressions[i].replace('<', '');
            }
        }

        if (expressions[i] !== 0)
            greaterSignDiff > maxReplacements[i] ? expressions[i] = 0 : expressions[i] = 1;
    }

    return expressions;
}

//balancedOrNot(['>>>', '><','<>>','<>'],[3 ,10, 1, 0]);