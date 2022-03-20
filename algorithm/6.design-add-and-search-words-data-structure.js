// 请你设计一个数据结构，支持 添加新单词 和 查找字符串是否与任何先前添加的字符串匹配 。
// 实现词典类 WordDictionary ：
// WordDictionary() 初始化词典对象
// void addWord(word) 将 word 添加到数据结构中，之后可以对它进行匹配
// bool search(word) 如果数据结构中存在字符串与 word 匹配，则返回 true ；否则，返回  false 。word 中可能包含一些 '.' ，每个 . 都可以表示任何一个字母。
//
// 示例：
// 输入：
// ["WordDictionary","addWord","addWord","addWord","search","search","search","search"]
// [[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]
// 输出：
// [null,null,null,null,false,true,true,true]
//
// 解释：
// WordDictionary wordDictionary = new WordDictionary();
// wordDictionary.addWord("bad");
// wordDictionary.addWord("dad");
// wordDictionary.addWord("mad");
// wordDictionary.search("pad"); // return False
// wordDictionary.search("bad"); // return True
// wordDictionary.search(".ad"); // return True
// wordDictionary.search("b.."); // return True
//
var WordDictionary = function () {
  // 为了降低复杂度，根据传入的word的长度作为key
  this.words = {};
};
/**
 * @param {string} word
 * @return {void}
 */
WordDictionary.prototype.addWord = function (word) {
  if (this.words[word.length]) {
    this.words[word.length].push(word);
  } else {
    this.words[word.length] = [word];
  }
};
/**
 * @param {string} word
 * @return {boolean}
 */
WordDictionary.prototype.search = function (word) {
  const len = word.length
  if (this.words[len]) {
    if (word.includes(".")) {
      const reg = new RegExp(word);
      return this.words[len].some((item) => reg.test(item));
    } else {
      return this.words[len].includes(word);
    }
  }
  return false;
};
/**
 * Your WordDictionary object will be instantiated and called as such:
 * var obj = new WordDictionary()
 * obj.addWord(word)
 * var param_2 = obj.search(word)
 */
const w = new WordDictionary();
w.addWord("bad");
w.addWord("dad");
w.addWord("mad");
console.log(w.search("pad"));
console.log(w.search("bad"));
console.log(w.search(".ad"));
console.log(w.search("b.."));
