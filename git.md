# Git

集中式和分布式的版本控制。

```bash
git --version # 安装成功啦！
mkdir mygit # 建一个文件夹

dir
pwd
ls

cd mygit
# 配置全局
git config --global user.email "469323054@qq.com"
git config --global user.name "jacob"
## 填好之后怎么看呢

git init # 就是在我本地创建了一个版本仓库
ls -a
```



## 克隆

不要在某一个项目中进行克隆，也就是说你克隆的时候，你所在的那个文件夹本身不是一个含有 .git 的文件夹，不是一个 git 项目，不是的话就可以克隆了。

```bash
git clone 地址（地址形如：https://github.com/mystery/abc.git）
```

克隆完之后你就能看到该目录下多了一个文件夹（ ls 看一下），克隆完毕。

```bash
# 我想删除文件夹
rm -rf 文件夹名称
rm -rf * # 删除该目录下所有东西
```



## 使用命令完成 git 流水线操作

```bash
# 建一个空白文件
touch a.php
#然后可以通过status来查看我当前的生成车间里面的整体状态，发现有 未跟踪文件。没有被版本库进行管理，没有提交过
git status
# 可以将他放进暂存区里
git add a.php # 此时暂存区和真正的仓库还有距离的喔！！！
# add完之后再看看状态，会发现放到暂存区了，待commit
git status

# 丢到仓库
git commit -m 'test01' # 丢进仓库也要登记描述。此时成功把文件放到仓库啦！

# 此时你再去看仓库的状态的时候，就是空的了。因为本地和远程仓库的文件是一样的
git status

# 如果我再去该a.php里面的内容，此时 status看到有个文件被modified了,然后再放到暂存区里,看看状态从红色变为绿色
git add a.php
git status
git commit -m 'test02'
git status # 又干净了

 # git add . 可以把全部都放进暂存区。那如果我放了50个文件，但我只有30个文件想入库。这就引申到后面的忽略文件啦！
```



## .gitignore

### 忽略文件

你建一个文件 a.txt（`touch a.txt`）和 .gitignore，查看状态的时候发现 有两个，然后你在 .gitignore 里加上下面这句。

```
*.txt
```

保存，接着再看状态（`git status`），发现没有跟踪这个 a.txt 了，不再跟踪了。如果你只是不想跟踪 a.txt，但是想跟踪 b.txt，你就可以写：

```
a.txt
```

然后 `git add .`的时候就不会把它添加到暂存区，b 就会。



那我所有的 txt 都不提交，除了 a.txt 呢？如下：

```bash
*.txt
!a.txt # 就是除了的意思（忽略所有，除了a）
```

此时你看状态，只有 b 和 c 不提交了，只有 a 提交



### 忽略目录

```bash
mkdir vendor
```

此时你 `git status`发现它不会跟踪的，因为在 git 里面，如果这个文件夹里面没有文件，它是不跟踪的。那我在它里面建一个文件（建一个文件：`touch vendor/index.php`），此时看看版本库的 status，它就出来了。

如果这个文件夹你不需要被检测，此时就会被忽略掉

```
*.txt
!a.txt
/vendor
```

你也可以限制它里面所有 PHP 文件不提交：

```
*.txt
!a.txt
/vendor/*.php
```



比如我在 vendor 里面有一个文件夹（ cd 进去后`touch composer/test.php`）里面有 php 文件，此时你也想忽略的话：

```
*.txt
!a.txt
/vendor/**/*.php
```

表示的是 它及其子目录里面的所有 php 文件！



有了忽略文件，我们在添加到暂存区的时候就可以放心用 `git add .`啦！把不需要添加的文件定义到忽略文件里就可以了。





## 从版本库中删除资源技巧

在此之前，一直都是往仓库里面放东西，肯定也希望从仓库移走东西，因为可能会放错。移走就是 rm，添加就是 add

```bash
mkdir bbs
cd bbs
touch a.txt
git status
git add .
git status # Changes to be committed
git commit -m 'put1' # 提交到版本库里了

# 此时我又想把它删掉 rm是删除文件
git rm a.txt # 你远程的删了，正常来说你本地也是不需要这个文件了
ls # 你删了版本库的，正常来说你本地的也没有。大部分情况是这样的
```



```bash
# 但有的时候，那我们不想的东西，不小心放到版本库了
touch readme.txt
git add .
git commit -m 'aa' # 丢到版本库了

git rm --cached readme.txt # 加上一个参数，再移除
ls # 但是我们本地还是在的~
git status # 此时我们看status的时候，看到deleted文件和本地动了但没提交的文件（两者都是readme.txt）

git commit -m 'aa'
git status # readme.txt还在~并且未commit它，因为我都没 add呢

git add . # 就是防止你手快add进去
```

这里说的放错，指的是，版本库放错了，但是我本地不能删它！只是想从版本库中移除。



## 版本库中改名

```bash
touch c.php
git add .
git commit -m 'add c.php'

git mv c.php hdr.php
git status # 此时你看状态，就能看到改名了
git commit -m 'c.php rename' # 然后可以执行提交了
git log --name-only
```



有时候大小写改变，会造成版本库不发生变化

```bash
touch index.php
git add .
git commit -m 'add file'
git mv index.php Index.php # 关于git mv命令出错的问题，先把文件加入到版本库，再用git mv命令就可以了，踩过的坑，记录一下。
git add .
git commit -m 'rename file'
```



另一种情况，我们手动把一个文件名改了，然后去看 status的时候

```bash
git status # 它把原来那个文件 删掉了，让你去添加那个新的
git add .
git commit -m 'rename one'
```



所以，你把文件名改成小写或大写，版本库没变，可以使用上述两种方式。



------



## 使用 log 日志查看历史操作记录

```bash
touch a.php
git add .
git commit -m 'add a.php'
touch b.php
vim a.php # 编辑a.php 按i进行插入，打完字之后按esc下面变成了冒号之后，输入wq，表示保存退出，就行了，就算编辑了一下
cat a.php
git status
git add .
git commit -m 'two'

git log
git log -p # 显示的更多更细，增加的内容
git log -p -1 # 显示最近一次提交
git log --online
git log --online -p
git log --name-only # 列出文件哪些发生了变化
git log --name-status # 列出文件并看是修改了还是添加
```

反正你要记得 `git log`



## 修改我们最新的一次提交

其实大部分时候，我们再新提交一次就可以了，但是如果你就想把 b.php 放到这次提交里。

```bash
# 提交完之后发现，我的 b.php也应该归纳到这次提交里面！
touch b.php
git add .
git status
git commit --amend # 还可以修改最近一次的提交description
# 搞定完 保存退出就可以了

git log --name-only # 列出文件哪些发生了变化
```



## 管理暂存区的文件

如果你放到暂存区后，后悔了

```bash
git add a.php
git status # 绿色
# 如果你放完到暂存区后，后悔了. 可以把它从暂存区撤销(还没有提交)
git rm --cached a.php
git status # 此时你发现不在暂存区了 是红色的了
git add .
git commit -m 'add a.php'

# 然后你改本地的（可以通过vim），改完之后看看状态
git status # 能看到 a.php 有修改记录  红色的modified
git add a.php # 此时你丢到暂存区
git status # 发现 变成了绿色的modified。已经在暂存区里了
# 如果此时你又后悔了！！！
git reset HEAD a.php
git status # 此时你发现又变成了红色的modified  修改状态

# 如果你要撤销的是这个文件 这次填的内容，要的是这个原来仓库里面的内容
git checkout -- a.php # 那这个文件就会回到最初的状态 在仓库的状态
cat a.php
```

- 这个文件没有提交过的时候，使用 cached
- 如果这个文件已经提交过了，我们 reset
- 如果这个文件你想要恢复到初始状态，撤销你修改时候 使用 checkout



------



## 分支 branch 基本操作

```bash
git branch # 你是看不到任何东西的，因为当前连主分支都没有，必须得经过一次提交之后，才会把那条线构建出来
touch a.php
git add .
git commit -m 'first'
git branch # 此时分支列表会看到一个主分支 master

# 创建分支还是使用这个命令
git branch ask # 此时创建了一个ask分支
git branch #此时你再看看分支，会多了一个
# 此时如果你进行代码提交的话，注意，都是在master主分支上提交

#切换到ask分支
git checkout ask # switched to branch 'ask'
git branch # 此时ask是绿色

touch ask.html
git add .
git commit -m 'ask commit'
ls # 有 php 有 html
git branch
# 此时切换到master分支
git checkout master
ls # 你会发现，切到master之后，只有那个php，没有ask.html
```



```bash
git checkout -b bbs # 这里实际上是执行了2个命令
# 1、创建了bbsfen分支，即：git branch bbs
# 2、切换分支至bbs，即：git checkout bbs

#所以此时当然应该在bbs分支
git branch
```

创建新功能的时候，首先要切换到那个干净的分支（master），在这个干净的分支来进行创建新的分支。



------



## 规范的分支操作流程之分支的合并与删除



```bash
git branch
git checkout ask
ls # ask.html xj.php
git checkout master
ls # 只有 xj.php

# 假如ask功能我们已经开发完了，要把它合并到主分支，此时你要切换到master主分支
git branch
git merge ask # 合并ask，我们要把ask中的所有提交合并到master
# 执行之后我们会看到一个：Fast-forward

# ask分支是由 master分支派生出来的，其实我只要把master分支的指针指向ask的最后一次就可以了，所以这个过程称它为fast
# 此时我们可以再看一下
git branch
ls # 这个 ask.html 文件就过来了

# 此时这个 ask 分支其实就没有存在的价值了，可以删除这个分支了
git branch -d ask #此时告诉你这个分支被删除了
git branch # 你发现 ask 就没了
```



## 正确处理分支冲突

现实生活中，资源都想用，就会造成冲突。

```bash
mkdir hd
cd hd
ls
git init
git branch # 没有分支，因为没有任何一次提交

vim xj.php # i 随便写吧，然后wq
cat xj.php
git add .
git commit -m 'master'

git branch ask
git checkout -b bbs # 执行了两步
git branch # 我现在在 bbs
vim xj.php # 随便改改 bbs
git add .
git commit -m 'bbs'
# 现在ask没有动 xj.php这个文件

# 此时切换回ask
git checkout ask
vim xj.php # ask 分支也要动这个文件. 写个ask
### 哈哈哈现在问题产生了，ask分支也抢了这个文件，冲突就产生了。先提交吧
git add .
git commit -m 'ask'

# 现在切换到master
git checkout master
git merge bbs # 我先把 bbs 合进来。好的成功合并
cat xj.php # 嗯没错是 bbs

# 好的 现在ask也想进来。也想合并
git merge ask # 诶这块就有提示了，失败咯！！它让你解决冲突之后再提交！！！
```



```bash
# 此时我们可以看一下这个 xj.php
vim xj.php # 这里是手动改，你也可以用IDE改
git add .
git commit -m 'success'
```





------

## --merged 和 --no-merged 及分支强制删除

查看已经合并的分支

```bash
git branch --merged # 查看已经合并的分支，可以看到这两个分支已经正常合并到 master里面了

git checkout -b test # 创建test并切换至test
git checkout master
git branch --merged # 你刚刚新建的test分支的内容，是和master一样的，提交点是一样的。是在一个提交点创建的

git checkout test
touch mm.php
git add .
git commit -m 'test' # 此时他和master就不一样了
git checkout master
git branch --merged # 我们发现test就不在这里面了
git branch --no-merged # 没有合并的分支  显示了test分支

# 此时你删test分支的话
git branch -d test # 失败，他说test分支还没有合并，不可以删
# 如果你确定要删掉这个没有合并的分支 就用大D
git branch -D test # 慎用
```



## 标准的分支操作工作流



------



## stash

你在一个分支里，文件改了一半，add 到了暂存区了，此时你想临时切换到其他分支，做一个比较紧急的事情，此时 git 不让你走，因为你这个还没有提交。但是你值做了一半，又不能提交 因为还没改完，所以可以把它暂存起来。

```bash
git add .
git status
git checkout bbs # 失败

git stash # 暂存
git stash list # 查看暂存的文件
# 此时可以切换了
git checkout bbs
ls

# 我们搞定bbs的事情了，再回来
git checkout ask
git stash apply # 恢复暂存区，不会删掉那个暂存区
ls
git stash list # 你这个暂存区依然存在的
git stash drop stash@{0} # 如果你不想要暂存区了，可以删掉。  stash@{0} 是你在list里看到的名字
git stash list # 此时你看暂存区 已经空啦！

# 当然你暂存之后，想恢复并且恢复完想把这个存储区删掉：
git stash pop
```



如果你创建了多个存储区的话，可以选择要恢复哪个

```bash
git stash apply stash@{0}
```



------



## 使用 TAG 标签声明项目阶段版本



```bash
git tag # 显示当前标签的列表
git tag v1.0 #为我们当前项目打了1.0的标签
```



```bash
git archive master --prefix='hdcms/' --forma=zip > hdcms.zip # 表示压缩之后的文件夹叫hdcms
```



## 合并分支产生的实际问题



```bash
git checkout master
# 此时我如果合并的话，就会产生合并记录了。就不是之前那种 fast-forward
git merge ask
```

ask 分支拎出来，加了东西做着做着 也提交了自己新的东西到ask分支，没有合并到主分支。此时 master 主分支也加了新的东西，并且也提交了，相当于 master 它往前走了一步。

此时你再去 `git merge ask`会产生一个新的合并消息。



### rebase 合理的优化分支合并

如果一个分支直接是从 master 继承过来的，某一个 commit 分出来的分支，然后如果 master 主分支没有做任何改变，我们合并的时候是不会产生分支合并的。

但是如果 master 分支有改变，尤其是在我们的开源项目里面，你分出了一个分支之后，你在里面编辑，可能我同时有其他的开发者也往这个项目里面提交代码，所以 master 它的 commit 是在不断往后走的，因为切出来分支之后，你可能要维护这个功能或者修复一个问题的时候，可能要写几天。

所以这个时候我们合并的时候就会有 2个问题：1、产生新的合并的 commit；2、我们的合并操作是由我们 master 的维护者来进行合并；所以的话我们希望，**不产生合并的分支**，我们希望冲突操作是由子分支的作者来进行维护。

这个时候我们就需要使用 rebase ，可以把它理解为 replace base 替换基础。刚刚分析过，如果这个子分支在开发的时候，主分支一点都没有动，没有任何 commit 的记录，那这些问题都能解决，就不会有这个合并。



稍微整理一下：如果我们从 master 主分支分出来一个分支，然后主分支没有任何变化，我们再进行合并的时候，不会产生合并的提交记录，也就是那条时间线是一条直线。只有在主分支有同步提交记录的时候，才会产生合并提交记录。那我们的 rebase 就是，我们子分支已经开发好了，我们把子分支的提交点，移到当前主分支最新的提交点，然后进行合并，这样就不会产生合并记录。说白了就是改变子分支的基础点。

我们只需要把这个子分支的产生点往后移一下，也就是 replace base 一下，rebase 的过程其实就是把提交点往后移，先把这个子分支的提交记录存起来，然后把子分支的提交点往后移，然后再把子分支的动作重新做一遍。

```bash
# 在此之前：首先在主分支创一个 master.php 并提交，然后创一个子分支，创建一个文件 touch ask.php 再提交，这个时候如果我切到主分支 去合并的话，是不会产生合并记录的，因为我主分支根本就没有动过啊！！！
# 那我现在切去主分支 touch 一个 m2.php后添加再提交，此时我在主分支合并的话，就会产生合并记录了！！！因为主分支他动了呀！！


# 那此时我肯定要在 那个子分支上操作啦
git checkout ask
git rebase master
git log # 此时你再看日志，看到把我主分支的提交点 拿过来了。把子分支的基础点移到了主分支的最新那一块

# 此时切换到master的时候，再执行合并！！！
git checkout master
git merge ask
git log # 看看日志就会非常的干净！！！也不会有一些额外的分支了
```

所以如果在给其他项目，尤其是在给开源项目提交一些操作的时候，还是先走一下 rebase，而且冲突本身也是开发者来解决的。



------



## Github 项目托管平台

创建完项目之后，会有选项，可以使用 SSH 也可以使用 HTTPS 来与我们的 github 进行连接。推荐使用 SSH ，使用 SSH 我们不需要来连接的时候输入账号和密码，当然你使用 HTTPS 也可以。

如果用命令行就用 SSH ，使用这个的时候我们得需要向我们的 github 传递我们的 SSH 的密钥才能进行连接。



## 使用 SSH  与 github 远程服务器进行无密码连接

使用 ssh 连接 github 发送指令更加安全可靠，也可以避免每次输入密码的困扰。

在命令行输入以下代码（windows 用户使用 Git bash）

```bash
ssh-keygen -t rsa
```

一直按回车到结束，系统会在`~/.ssh`目录中生成`id_rsa`和`id_rsa.pub`，即密钥`id_rsa`和密钥`id_rsa.pub`

```bash
cd ~/.ssh
ls
subl id_rsa.pub # 这是我们的公钥  把里面的内容复制
```

复制之后回到 github 的 settings 的 SSH and GPG keys 然后 new SSH key，title看你填什么，内容填你刚刚复制的内容粘贴进去。然后我们就可以使用 SSH 进行克隆了，去仓库把 SSH 克隆复制下来，然后 `git clone git@xxxx`就OK了，就克隆到本地了，与远程服务器已经连接了，然后你在本地可以：

```bash
cd 项目名
touch abc.txt
git add .
git commit -m 'test' # 提交到本地库 commit是提交到本地
git push # 推到远程
```



如果连不上：

```bash
cd
cd .ssh
ls # 把known_hosts 里的内容全删掉。可以把它理解为缓存数据
```



------



## 本地版本库主动使用 remote 与远程 github 关联

之前是通过服务器克隆下来的，服务器扮演的是主角，那试试本地作为主角。

```bash
mkdir test
cd test
vim README.md # 或者打开编辑器修改
cat README.md
git add .
git commit -m 'first commit'
git log # 以上这一切操作都是在我本地
```

现在我想让本地与远程进行关联，此时就需要这个指令

```bash
git remote add origin xxx.git # 可以是SSH可以是HTTPS （本地作为主角来跟远程进行关联）

# 关联之后就可以向远程推送代码了
git remote -v # 看到与远程服务器进行关联了
git push -u origin master # 表示我们推送到远程服务器的 master 分支
```

这个例子是，本地写好的代码，然后与远程服务器进行关联，跟之前那个相反。



## 本地分支与 github 远程分支同步

```bash
git branch # 显示当前分支
git branch -a # 显示远程分支
git checkout -b ask
touch ask.html
git add .
git commit -m 'ask commit'

git branch -a # 现在我本地有2个分支，远程1个分支
git push # 此时推送会有个错误，说当前的分支没有与远程的分支进行关联，然后它给了你一段命令，建议你执行，然后执行一下
git push --set-upstream origin ask # 然后我们去github刷新 也可以看到这个分支了
# 点开 ask 也可以看到 ask.html
```

这样就把本地的分支 与远程的进行创建



------



## 我新来的

```bash
pwd
git clone xxx
cd hd
git branch
git branch -a # 看到远程的分支，和本地当前的分支

git pull origin ask:ask # 请求远程，把ask分支弄到本地的ask里面
git branch -a # 此时当前就有 ask分支了
git checkout ask # 切换到ask分支
git branch
ls # 我已经把其他同事的代码弄到本地了

# 我的工作
touch index.php
touch hello.asp
git add .
git commit -m 'my first commit'

git push
```



## github 远程分支合并

```bash
git branch -a # 当前我在ask里面

# 现在执行 rebase，把ask分支的基准点移到最新的master

# 其实可以先到master，先把master更改为最新的状态
git checkout master
git pull

git checkout ask
git rebase master #把我ask分支的起始点移到了当前master分支的最后的commit
git checkout master

# 然后执行合并
git merge ask # 此时就可以平滑的合并了
git push

git branch --merged # 查看已经成功合并的分支
```



## 远程分支删除操作

```bash
# 你现在在master
git push origin --delete ask # 然后你github上就没有ask分支了
git branch -a # 就看到远程上没有 ask分支了

# 本地也可以删掉
git branch -d ask # 本地分支也删掉咯
git branch -a
```



------



## git 自动部署之流程分支

背景：我们在本地开发代码的时候，把代码推到 github 上，然后我们希望当我们推送之后，我们的 web 服务器自动从 github 拉取最新的代码，这是要实现的。

我们向 github 推送代码的时候，会触发一个 github 的钩子，github 就会请求我们的 web 服务器的一个文件，请求一个 webhook.php ，通过这个 php 文件来执行 git pull，把代码拉去到我们的 web 服务器里面，这样 web 服务器就得到了最新的代码，所以这个流程基本上是这样。

首先我们需要为这个项目配置钩子，还要写 php 代码。

去项目的代码仓库点击 settings ，然后点击 webhooks，新添加一个钩子。在设置钩子的时候你需要填写你的 web 服务器地址。



当用户往远程仓库推送代码，github 就要请求我们的 web 服务器的一个地址，所以把 web 服务器配置好。



















