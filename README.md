# postprocess.js
## これは何?
HTMLの末尾で読み込むことで、DOMをいじって各種機能を提供するJavaScriptです。現状で以下のふたつの機能があります。
- マウスオーバーで脚注を付ける機能
- `<pre>`で囲んだコードブロックに行番号を付ける機能

HTMLの終わりの方、`</body>`の直前あたりで、以下のように読み込む使い方を想定しています。
```
(前略)
<script src="./postprocess.js"></script>
</body>
</html>
```
postprocess.jsは、上記`<script>`要素を読み込んだ時点で実行され、かつ、その時点で本文のDOMが構築済みであることを想定しているため、必ずページの末尾で読み込まなければいけません。

## マウスオーバーで脚注を付ける機能
ページの末尾に脚注を記述し、それを参照する「※1」のようなリンクを文中に付けて、その「※1」にマウスオーバーすることで脚注の内容を読むことができる、という使い方を想定しています。
まず、脚注は、footnoteクラスを付与した`<ul>`要素として、ページの末尾に記述します。
```
<ul>
<li><a name="hoge"> 「hoge」というのは、サンプルプログラム等で「何の意味もない名前」であることを示すために使われる名前のひとつです。詳細は<a href="https://kmaebashi.com/programmer/hoge.html">ほげを考えるページ</a>を参照してください。
</ul>
```
その上で、参照する箇所には、たとえば以下のように書きます。
```
ではここで、アドレス演算子`&`を使用して、変数hoge<sup><a href="#hoge">※1</a></sup>のアドレスを取得してみます。
```
こう書いておけば、JavaScriptが動かなくても、※1部分をクリックすることでページ下部の脚注にジャンプできますが、postprocess.jsを読み込むことで、※1にマウスオーバーすれば脚注の内容を読むことができます。はてなブログの脚注と同様の機能です。

### `<pre>`で囲んだコードブロックに行番号を付ける機能
HTML内にソースコード等を載せる際、linenumberクラスを付与した`<pre>`要素として記述すると、行番号を付けてくれる機能です。
```
<pre class="linenumber">
#include &lt;stdio.h&gt;

int main(int argc, char **argv)
{
    printf("hello, world.\n");

    return 0;
}
</pre>
```
`<\pre>`内に記述されているコードは、HTMLのエスケープが事前に行われている前提です(上記hello, worldの「`#include <stdio.h>`」を参照のこと)。
これで生成されるコードブロックは、1行2列の`<table>`要素であり、左の`<td>`に行番号が、右の`<td>`にソースが入れられています。以下のclass属性が付与されているので、見た目はCSSでいじってください。サンプルのlinenumber.cssも添付してあります。
| 要素 | class属性 |
| ---- | ---- |
| table全体 | linenumbertable |
| 左のpre | linenumber-left-td |
| 右のpre | linenumber-right-td |
