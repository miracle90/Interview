const arr = [
  { id: 2, name: "部门2", pid: 1 },
  { id: 4, name: "部门4", pid: 3 },
  { id: 6, name: "部门6", pid: 2 },
  { id: 3, name: "部门3", pid: 1 },
  { id: 5, name: "部门5", pid: 4 },
  { id: 1, name: "部门1", pid: 0 },
  { id: 7, name: "部门1", pid: 0 },
];
const tree = {
  id: 1,
  name: "部门1",
  pid: 0,
  children: [
    {
      id: 2,
      name: "部门2",
      pid: 1,
      children: [],
    },
    {
      id: 3,
      name: "部门3",
      pid: 1,
      children: [
        {
          id: 4,
          name: "部门4",
          pid: 3,
          children: [
            {
              id: 5,
              name: "部门5",
              pid: 4,
              children: [],
            },
          ],
        },
      ],
    },
  ],
};
/**
 * 树形结构转数组
 * 使用队列的形式
 * 有 children push 进队列中，直到队列清空
 * @param {*} tree
 * @returns
 */
function treeToArr(tree) {
  const res = [];
  const queue = [tree];
  while (queue.length) {
    const item = queue.shift();
    const { id, name, pid, children } = item;
    res.push({
      id,
      name,
      pid,
    });
    while (children && children.length) {
      queue.push(children.shift());
    }
  }
  return res;
}
/**
 * 构建一个map，key为 pid
 * @param {*} arr
 * @returns
 */
function arrToTree(arr) {
  const result = [];
  const map = {};
  // 循环数组
  for (const item of arr) {
    const { id, pid } = item;
    // 以id为key，写入map中
    map[id] = {
      ...item,
      // 子元素可能在数组中当前元素的前面，在map上写过了，children 复用过来
      children: map[id] ? map[id].children : [], // 可能是之前的子元素在map上写入的，直接原封不动赋值
    };
    const mapItem = map[id];
    if (pid === 0) {
      result.push(mapItem);
    } else {
      if (map[pid]) {
        map[pid].children.push(mapItem);
      } else {
        // 如果map中没有pid，插入一个，先写入children
        map[pid] = {
          children: [mapItem],
        };
      }
    }
  }
  return result;
}
console.log(treeToArr(tree));
console.dir(arrToTree(arr), { depth: null });
