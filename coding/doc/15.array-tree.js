const arr = [
  { id: 2, name: "部门2", pid: 1 },
  { id: 4, name: "部门4", pid: 3 },
  { id: 6, name: "部门6", pid: 2 },
  { id: 3, name: "部门3", pid: 1 },
  { id: 5, name: "部门5", pid: 4 },
  { id: 1, name: "部门1", pid: 0 },
  { id: 7, name: "部门1", pid: 0 },
];
function arrToTree(arr) {
  const map = {};
  const result = [];
  for (const item of arr) {
    const { id, pid } = item;
    map[id] = {
      ...item,
      children: map[id] !== undefined ? map[id] : [],
    };
    const mapItem = map[id];
    if (pid === 0) {
      result.push(mapItem);
    } else {
      if (map[pid]) {
        map[pid].children.push(mapItem);
      } else {
        map[pid] = {
          children: [mapItem],
        };
      }
    }
  }
  return result;
}
console.dir(arrToTree(arr), { depth: null });

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
console.log(treeToArr(tree));