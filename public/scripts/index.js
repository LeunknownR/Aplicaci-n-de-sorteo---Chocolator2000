import initRelations from './libs/relations.js';
import initResult from './libs/result.js';

const Init = () => {
    const initFunctions = {
        initRelations,
        initResult
    };
    for (const key in initFunctions) {
        const func = initFunctions[key];
        typeof(func) === 'function' && func(); 
    }
} 
Init();