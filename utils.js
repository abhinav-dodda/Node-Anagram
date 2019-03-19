function isAnagram(str1, str2){
    const pattern = /[^\w]/g;
    return cleanString(str1, pattern) === cleanString(str2, pattern);
}

function cleanString(str, pattern){
    return str.replace(pattern,'').toLowerCase().split('').sort().join();
}

module.exports = { isAnagram, cleanString }