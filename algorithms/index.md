---
layout: default
title: Algorithms
description: 一些算法
---

### [A10](A10)

### [A11](A11)

### [NOIP 初赛复习](exam1_review)

- [输入输出优化](#输入输出优化)
- [大整数](#大整数)
- [最大公因数](#最大公因数)
- [并查集](#并查集)
- [链式前向星](#链式前向星)
- [Dijkstra堆优化](#dijkstra堆优化)
- [SPFA](#spfa)
- [Floyd](#floyd)
- [拓扑排序](#拓扑排序)
- [Kruskal](#kruskal)
- [快速幂](#快速幂)
- [线段数组（视频讲解）](#线段数组)
- [快速排序](#快速排序)
- [运算符优先级](#运算符优先级)
- [一些话](#一些话)

### 输入输出优化

```cpp
ios::sync_with_stdio(false);
cin.tie(0);
```

### 大整数

```cpp
bool mygreater(const string& a, const string& b)
{
 if (a.size() == b.size())
 {
  return a >= b;
 }
 return a.size() >= b.size();
}

string add(string a, string b)
{
 size_t len = max(a.size(), b.size()) + 1;
 a.insert(0, len - a.size(), '0');
 b.insert(0, len - b.size(), '0');

 string ans;
 ans.reserve(len);
 int extra = 0;
 for (size_t i = len - 1; i != size_t(-1); --i)
 {
  int tmp = (a[i] - '0') + (b[i] - '0') + extra;
  ans.push_back(tmp % 10 + '0');
  extra = tmp / 10;
 }
 ans.erase(ans.find_last_not_of('0') + 1);
 return ans.empty() ? "0" : string(ans.rbegin(), ans.rend());
}

string myminus(string a, string b)
{
 size_t len = max(a.size(), b.size());
 a.insert(0, len - a.size(), '0');
 b.insert(0, len - b.size(), '0');

 bool isneg = false;
 if (a < b)
 {
  swap(a, b);
  isneg = true;
 }

 string ans;
 ans.reserve(len);
 int extra = 0;
 for (size_t i = len - 1; i != size_t(-1); --i)
 {
  int tmp = 10 + a[i] - b[i] - extra;
  ans.push_back(tmp % 10 + '0');
  extra = tmp < 10 ? 1 : 0;
 }
 ans.erase(ans.find_last_not_of('0') + 1);
 return ans.empty() ? "0" : (isneg ? "-" : "") + string(ans.rbegin(), ans.rend());
}

string times(string a, string b)
{
 reverse(a.begin(), a.end());
 reverse(b.begin(), b.end());
 a += '0';
 b += '0';
 string ans(a.size() + b.size(), '0');
 for (size_t i = 0; i < a.size(); ++i)
 {
  int extra = 0;
  for (size_t j = 0; j < b.size(); ++j)
  {
   int tmp = (ans[i + j] - '0') + (a[i] - '0') * (b[j] - '0') + extra;
   ans[i + j] = tmp % 10 + '0';
   extra = tmp / 10;
  }
 }
 ans.erase(ans.find_last_not_of('0') + 1);
 return ans.empty() ? "0" : string(ans.rbegin(), ans.rend());
}

pair<string, string> divide2(string a, string b)//高精除以高精
{
 size_t lena = a.size();
 string ans;
 ans.reserve(lena);
 for (size_t zeros = lena - b.size(); zeros < lena; --zeros)
 {
  string divisor = b + string(zeros, '0');
  ans.push_back('0');
  while (mygreater(a, divisor))
  {
   a = myminus(a, divisor);
   ++ans[ans.size() - 1];
  }
 }
 ans.erase(0, ans.find_first_not_of('0'));
 return make_pair(ans.empty() ? "0" : ans, a);
}

pair<string, long long> divide1(const string& a, long long b)//快除（高精除以整数）
{
 string ans;
 ans.reserve(a.size());
 long long dividend = 0;
 for (size_t i = 0; i < a.size(); ++i)
 {
  long long tmp = dividend * 10 + (a[i] - '0');
  ans.push_back(char(tmp / b + '0'));
  dividend = tmp % b;
 }
 ans.erase(0, ans.find_first_not_of('0'));
 return make_pair(ans.empty() ? "0" : ans, dividend);
}
```

### 最大公因数
```cpp
long long gcd(long long a, long long b)
{
 return b == 0 ? a : gcd(b, a % b);
}

void exgcd(int a, int b, int& x, int& y) { // 拓展欧几里得算法
  if (b == 0) {
    x = 1, y = 0;
    return;
  }
  exgcd(b, a % b, y, x);
  y -= a / b * x;
}
```

### 并查集

```cpp
void init() {
    for (int i = 1; i <= n; i++) {
        fa[i] = i;
    }
}
int get(int x) {
    if (fa[x] == x) {
        return fa[x];
    }
    fa[x] = get(fa[x]); //路径压缩
    return fa[x];
}
void merge(int x, int y) {
    x = get(x);
    y = get(y);
    if (x != y) { // 不在同一个集合
        fa[y] = x;
    }
}
```

### 链式前向星

```cpp
int tot = -1, head[MAXN];
struct Edge{int to, next, w;} edge[MAXN];
void list_star_init() {
    memset(head, -1, sizeof(head));
}
void add_edge(int u, int v, int w) {
    edge[++tot] = (Edge){v, head[u], w};
    head[u] = tot;
}
```

### Dijkstra堆优化

```cpp
int d[MAXN];
void dij(int s) {
    memset(d, 0x3f, sizeof(d));
    set<pair<int, int>> min_heap;
    min_heap.insert(make_pair(0, s));
    while (!min_heap.empty()) {
        int curr = min_heap.begin()->second; // 取出最近的点
        min_heap.erase(min_heap.begin());    // 删除首元素
        for (int i = head[curr]; i != -1; i = edge[i].next) {
            int next = edge[i].to;
            if (d[next] > d[curr] + edge[i].w) {
                min_heap.erase(make_pair(d[next], next));  // 先删除原来的元素
                d[next] = d[curr] + edge[i].w;             // 更新距离
                min_heap.insert(make_pair(d[next], next)); // 加入新的元素
            }
        }
    }
}
```

### SPFA

```cpp
bool in_queue[MAXN];
int d[MAXN]; // 如果到顶点 i 的距离是 0x3f3f3f3f，则说明不存在源点到 i 的最短路
queue<int> q;
void spfa(int s) {
    memset(in_queue, 0x00, sizeof(in_queue));
    memset(d, 0x3f, sizeof(d));
    d[s] = 0;
    in_queue[s] = true; // 标记 s 入队
    q.push(s);
    while (!q.empty()) {
        int curr = q.front();
        q.pop();
        in_queue[curr] = true;
        for (int i = head[curr]; i != -1; i = edge[i].next) {
            int next = edge[i].to;
            if (d[next] > d[curr] + edge[i].w) { // 更新
                d[next] = d[curr] + edge[i].w;
                if (!in_queue[next]) { // 如果之前没入队
                    q.push(next);          // 入队
                    in_queue[next] = true; // 标记 to 入队
                }
            }
        }
    }
}
```

### Floyd

```cpp
int edge[MAXN][MAXN];
void floyd(int n) {
    for (int k = 1; k <= n; k++) { // 中间点
        for (int i = 1; i <= n; i++) { // 起点
            for (int j = 1; j <= n; j++) { // 终点
                edge[i][j] = min(edge[i][j], edge[i][k] + edge[k][j]);
            }
        }
    }
}
```

### 拓扑排序

```cpp
int seq[MAXN] = {};
bool toposort() {
    int deg[MAXN];
    queue<int> q;
    for (int i = 0; i <= tot; i++) { // 遍历边
        deg[edge[i].to]++;
    }
    for (int i = 1; i <= n; i++) { // 遍历点
    
        if (deg[i] == 0) {
            q.push(i);
        }
    }
    int ncnt = -1;
    while (!q.empty()) {
        int curr = q.front();
        q.pop();
        seq[++ncnt] = curr;
        for (int i = head[curr]; i != -1; i = edge[i].next) {
            int next = edge[i].to;
            deg[next]--;
            if (deg[next] == 0) {
                q.push(curr);
            }
        }
    }
    return ncnt == n;
}
```

### Kruskal

```cpp
// -->> 并查集 <<-- //
struct Edge {int u, v, w;} e[maxm]; // 使用结构体储存每一条边，便于排序
int ecnt; // 用于边表计数
int Kruskal() {
    init(); // 初始化并查集
    sort(e + 1, e + ecnt + 1, cmp);
    int cnt = 0;
    int ans = 0;
    for (int i = 1; i <= ecnt; i++) {
        int u = e[i].u;
        int v = e[i].v;
        u = get(u);
        v = get(v);
        if(u != v) {
            fa[u] = v;
            cnt++;
            ans = max(ans, e[i].w);
        }
    }
    return (cnt == n ? ans : -1);
}
```

### 快速幂

```cpp
int qpow(int a, int n){
    int ans = 1;
    while(n){
        if(n&1)        //如果n的当前末位为1
            ans *= a;  //ans乘上当前的a
        a *= a;        //a自乘
        n >>= 1;       //n往右移一位
    }
    return ans;
}
```

### 线段数组

[视频讲解](https://b23.tv/7ohQVP0)

```cpp
int b[MAXN] = {}, n;
inline int lowbit(int x) {
 return x & (-x);
}
void add(int p, int x) {
 while (p < n) {
  b[p] += x;
  p += lowbit(p);
 }
}
long long count(int p) {
 long long res = 0;
 while (p) {
  res += p[b];
  p -= lowbit(p);
 }
 return res;
}
```

### 快速排序

[题目](https://www.luogu.com.cn/problem/P1177)

```cpp
#include <cstdio>
#include <cstdlib>
using namespace std;

void qsort(int * a, int l, int r) {
 int i = l, j = r, mid = (l+r)/2; // 随机取一个数mid，作为基准数
 while(i <= j) {      // 每次：{
  while(a[i] < mid) i++;   // 从左向右找到第一个比mid大（或等）的元素，并
  while(a[j] > mid) j--;   // 从右向左找到第一个比mid小（或等）的元素
  if (i <= j) {     // 如果这个比mid大的元素在比mid小的元素的左边（大--小），那么此时说明这两个元素不合顺序
   swap(a[i],a[j]);   // 此时交换两个数，使得较小的数在左边，较大的数在右边
   i++, j--;
  }
 }         // }
 if (l < j) qsort(a, l, j);   // 此时i与j相交，即j在i的左边，且此时i≠j（l--ji--r）
 if (i < r) qsort(a, i, r);   // 将l--j，i--r传入函数进行递归
}
// *其实mid并没有什么作用，只是作为基准数，
// *但是这个基准数是快排的重要工具，它可以使得这一个数组被切成两半
// *基准数可以不是数组里的元素，但必须在该数组最小值到最大值之间，可以等于，但若等于，此时数组会被分为一个数组和单个（最值）元素，此时算法退化

int n, arr[100010];
int main() {
 scanf("%d",&n);
 for (int i = 1; i <= n; i++) scanf("%d",&arr[i]);
 qsort(arr, 1, n);
 for (int i = 1; i <= n; i++) printf("%d ",arr[i]);
 return 0;
}
```

### 运算符优先级

<table style="font-size:15px" border="1" cellspacing="5" cellpadding="5"><tbody><tr><th class="code-table-th">优先级</th><th class="code-table-th">操作符</th><th class="code-table-th">描述</th><th class="code-table-th">例子</th><th class="code-table-th">结合性</th></tr><tr><td class="code-table-td">1</td><td class="code-table-td">()<br> []<br> -&gt;<br> .<br> ::<br> ++<br> --</td><td class="code-table-td">调节优先级的括号操作符<br> 数组下标访问操作符<br> 通过指向对象的指针访问成员的操作符<br> 通过对象本身访问成员的操作符<br> 作用域操作符<br> 后置自增操作符<br> 后置自减操作符</td><td class="code-table-td">(a + b) / 4;<br> array[4] = 2;<br> ptr-&gt;age = 34;<br> obj.age = 34;<br> Class::age = 2;<br> for( i = 0; i &lt; 10; i++ ) ...<br> for( i = 10; i &gt; 0; i-- ) ...</td><td class="code-table-td">从左到右</td></tr><tr><td class="code-table-td">2</td><td class="code-table-td">!<br> ~<br> ++<br> --<br> -<br> +<br> *<br> &amp;<br> (type)<br> <a href="http://www.cppreference.com/keywords/sizeof.html">sizeof</a></td><td class="code-table-td">逻辑取反操作符<br> 按位取反(按位取补) <br> 前置自增操作符<br> 前置自减操作符<br> 一元取负操作符<br> 一元取正操作符<br> 解引用操作符<br> 取地址操作符<br> 类型转换操作符<br> 返回对象占用的字节数操作符</td><td class="code-table-td">if( !done ) ...<br> flags = ~flags;<br> for( i = 0; i &lt; 10; ++i ) ...<br> for( i = 10; i &gt; 0; --i ) ...<br> int i = -1;<br> int i = +1;<br> data = *ptr;<br> address = &amp;obj;<br> int i = (int) floatNum;<br> int size = sizeof(floatNum);</td><td class="code-table-td">从右到左</td></tr><tr><td class="code-table-td">3</td><td class="code-table-td">-&gt;*<br> .*</td><td class="code-table-td">在指针上通过指向成员的指针访问成员的操作符<br> 在对象上通过指向成员的指针访问成员的操作符</td><td class="code-table-td">ptr-&gt;*var = 24;<br> obj.*var = 24;</td><td class="code-table-td">从左到右</td></tr><tr><td class="code-table-td">4</td><td class="code-table-td">*<br> /<br> %</td><td class="code-table-td">乘法操作符<br> 除法操作符<br> 取余数操作符</td><td class="code-table-td">int i = 2* 4;<br> float f = 10 / 3;<br> int rem = 4 % 3;</td><td class="code-table-td">从左到右</td></tr><tr><td class="code-table-td">5</td><td class="code-table-td">+<br> -</td><td class="code-table-td">加法操作符<br> 减法操作符</td><td class="code-table-td">int i = 2 + 3;<br> int i = 5 - 1;</td><td class="code-table-td">从左到右</td></tr><tr><td class="code-table-td">6</td><td class="code-table-td">&lt;&lt;<br> &gt;&gt;</td><td class="code-table-td">按位左移操作符<br> 按位右移操作符</td><td class="code-table-td">int flags = 33 &lt;&lt; 1;<br> int flags = 33 &gt;&gt; 1;</td><td class="code-table-td">从左到右</td></tr><tr><td class="code-table-td">7</td><td class="code-table-td">&lt;<br> &lt;=<br> &gt;<br> &gt;=</td><td class="code-table-td">小于比较操作符<br> 小于或等于比较操作符<br> 大于比较操作符<br> 大于或等于比较操作符</td><td class="code-table-td">if( i &lt; 42 ) ...<br> if( i &lt;= 42 ) ...<br> if( i &gt; 42 ) ...<br> if( i &gt;= 42 ) ...</td><td class="code-table-td">从左到右</td></tr><tr><td class="code-table-td">8</td><td class="code-table-td">==<br> !=</td><td class="code-table-td">等于比较操作符<br> 不等于比较操作符</td><td class="code-table-td">if( i == 42 ) ...<br> if( i != 42 ) ...</td><td class="code-table-td">从左到右</td></tr><tr><td class="code-table-td">9</td><td class="code-table-td">&amp;</td><td class="code-table-td">按位与操作符</td><td class="code-table-td">flags = flags &amp; 42;</td><td class="code-table-td">从左到右</td></tr><tr><td class="code-table-td">10</td><td class="code-table-td">^</td><td class="code-table-td">按位异或操作符</td><td class="code-table-td">flags = flags ^ 42;</td><td class="code-table-td">从左到右</td></tr><tr><td class="code-table-td">11</td><td class="code-table-td">|</td><td class="code-table-td">按位或操作符</td><td class="code-table-td">flags = flags | 42;</td><td class="code-table-td">从左到右</td></tr><tr><td class="code-table-td">12</td><td class="code-table-td">&amp;&amp;</td><td class="code-table-td">逻辑与操作符</td><td class="code-table-td">if( conditionA &amp;&amp; conditionB ) ...</td><td class="code-table-td">从左到右</td></tr><tr><td class="code-table-td">13</td><td class="code-table-td">||</td><td class="code-table-td">逻辑或操作符</td><td class="code-table-td">if( conditionA || conditionB ) ...</td><td class="code-table-td">从左到右</td></tr><tr><td class="code-table-td">14</td><td class="code-table-td">? :</td><td class="code-table-td">三元条件操作符</td><td class="code-table-td">int i = (a &gt; b) ? a : b;</td><td class="code-table-td">从右到左</td></tr><tr><td class="code-table-td">15</td><td class="code-table-td">=<br> +=<br> -=<br> *=<br> /=<br> %=<br> &amp;=<br> ^=<br> |=<br> &lt;&lt;=<br> &gt;&gt;=</td><td class="code-table-td">赋值操作符<br> 复合赋值操作符(加法)<br> 复合赋值操作符(减法)<br> 复合赋值操作符(乘法)<br> 复合赋值操作符(除法)<br> 复合赋值操作符(取余)<br> 复合赋值操作符(按位与)<br> 复合赋值操作符(按位异或)<br> 复合赋值操作符(按位或)<br> 复合赋值操作符(按位左移)<br> 复合赋值操作符(按位右移)</td><td class="code-table-td">int a = b;<br> a += 3;<br> b -= 4;<br> a*= 5;<br> a /= 2;<br> a %= 3;<br> flags &amp;= new_flags;<br> flags ^= new_flags;<br> flags |= new_flags;<br> flags &lt;&lt;= 2;<br> flags &gt;&gt;= 2;</td><td class="code-table-td">从右到左</td></tr><tr><td class="code-table-td">16</td><td class="code-table-td">,</td><td class="code-table-td">逗号操作符</td><td class="code-table-td">for( i = 0, j = 0; i &lt; 10; i++, j++ ) ...</td><td class="code-table-td">从左到右</td></tr></tbody></table>

### 一些话

#### 留给后人 - 技巧

[初学者自学](https://www.hello-algo.com/) | [深入研究](https://oi-wiki.org/) | [自己写的](http://blog.enming.top/algorithms/index.html) | [避坑技巧](https://loj.ac/d/3422)

你可以使用VS Code，然后你就可以享受代码补全，舒适的调试，方便的自定义编译选项，自动格式化代码等等好处。

#### 编译选项

```
g++ a.cpp -o a -std=c++14 -O2 -Wall -Wextra -fno-ms-extensions -fsanitize=address,undefined
```

1. 用 `#include<bits/stdc++.h>`（内含 OI 通常能用到的所有头文件）而不是逐个写头文件，以免实际上漏了头文件但本地环境自动补齐。（小心bits的斜杠在win下反过来打也能过编）
2. （可选）把整个程序装进自己的 `namespace`，以免和库中的名称冲突（比如 `next` 和 `pipe`）
3. 如果题目没有特别说明，编译选项尽量加上 `-std=c++14`。如果这样不能编译（指的是编译器版本过低不支持 C++14 而不是你的程序编译错误！），就至少加上 `-std=c++11`。
4. 编译选项加上 `-Wall -Wextra`，让编译器提醒一些常见错误，比如函数不写返回值。
5. 编译选项加上 `-fno-ms-extensions`（关闭一些和 msvc 保持一致的特性，例如，关闭后不标返回值类型的函数会报 CE 而不是默认为 `int`）。
6. 函数无返回值在低版本g++中开O2概率性正常执行，高版本g++中必re。
7. 于是添加了`-fsanitize=address,undefined`后运行时会帮你检查地址越界和未定义行为可能引发的问题（会略微降低你代码的速度，正常现象）
8. 极端一点可以使用`-Werror`，这样做警告都会当错误报。