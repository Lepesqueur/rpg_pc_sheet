/**
 * Stringifies an object for compendium export, removing quotes from keys
 * to match the JavaScript object literal style used in compendium.js.
 * 
 * @param {Object} obj The object to stringify
 * @returns {string} The stringified object with unquoted keys
 */
export const stringifyForCompendium = (obj) => {
    // Stringify with 4 spaces indentation
    const json = JSON.stringify(obj, null, 4);

    // Remove quotes from keys. 
    // This regex looks for:
    // ^      - start of a line
    // (\s*)  - any leading indentation
    // "      - a literal double quote
    // (\w+)  - one or more word characters (the key)
    // ":     - a literal double quote and colon
    // /gm    - global and multiline flags
    return json.replace(/^(\s*)"(\w+)":/gm, '$1$2:');
};
