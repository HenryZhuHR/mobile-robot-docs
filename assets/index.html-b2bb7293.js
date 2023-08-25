import{_ as t,r as l,o as i,c as r,a as e,d as n,b as a,e as o}from"./app-0530136c.js";const c="/assets/shell-fdisk_-l-b52243b4.png",d="/assets/shell-df_-h-78c9e4cf.png",p="/assets/jtop-43e262fe.png",u={},h=o('<h1 id="jetson" tabindex="-1"><a class="header-anchor" href="#jetson" aria-hidden="true">#</a> Jetson</h1><ul><li><a href="#jetson">Jetson</a><ul><li><a href="#%E7%B3%BB%E7%BB%9F%E7%9B%B8%E5%85%B3">系统相关</a><ul><li><a href="#%E7%83%A7%E5%86%99%E7%B3%BB%E7%BB%9F">烧写系统</a></li><li><a href="#%E5%A4%87%E4%BB%BD%E7%B3%BB%E7%BB%9F">备份系统</a></li></ul></li><li><a href="#%E8%BD%AF%E4%BB%B6%E5%AE%89%E8%A3%85">软件安装</a><ul><li><a href="#jtop-%E7%B3%BB%E7%BB%9F%E7%9B%91%E6%8E%A7%E8%BD%AF%E4%BB%B6">jtop 系统监控软件</a></li><li><a href="#ros2">ROS2</a></li></ul></li></ul></li></ul><h2 id="系统相关" tabindex="-1"><a class="header-anchor" href="#系统相关" aria-hidden="true">#</a> 系统相关</h2><h3 id="烧写系统" tabindex="-1"><a class="header-anchor" href="#烧写系统" aria-hidden="true">#</a> 烧写系统</h3>',4),b={href:"https://developer.nvidia.com/embedded/learn/get-started-jetson-nano-devkit#write",target:"_blank",rel:"noopener noreferrer"},v={href:"https://developer.nvidia.com/embedded/jetpack-sdk-461",target:"_blank",rel:"noopener noreferrer"},m=e("li",null,[e("strong",null,"OS"),n(": L4T 32.7.1 (Ubuntu 18.04, Linux kernel 4.9)")],-1),k={href:"https://docs.nvidia.com/deeplearning/tensorrt/archives/tensorrt-821/quick-start-guide/index.html",target:"_blank",rel:"noopener noreferrer"},f=e("strong",null,"TensorRT 8.2.1",-1),_=e("li",null,[e("strong",null,"cuDNN 8.2.1")],-1),g={href:"https://docs.nvidia.com/cuda/archive/10.2/cuda-toolkit-release-notes/index.html#title-new-features",target:"_blank",rel:"noopener noreferrer"},B=e("strong",null,"CUDA 10.2",-1),E=e("strong",null,"Docker 20.10.21",-1),x={href:"https://catalog.ngc.nvidia.com/containers",target:"_blank",rel:"noopener noreferrer"},j=o(`<h3 id="备份系统" tabindex="-1"><a class="header-anchor" href="#备份系统" aria-hidden="true">#</a> 备份系统</h3><p>对 Jetson Nano 的系统 TF 卡备份需要在 Linux 的 Host 机上进行。将 TF 卡插入 Host 主机中，并查看需要备份到 TF 卡设备号，以下两个命令(<code>fdisk</code>/<code>df</code>)均可，可以查看到一个 32GB 的卡的设备号为 <code>/dev/sdb</code></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">fdisk</span> <span class="token parameter variable">-u</span> <span class="token parameter variable">-l</span> <span class="token comment">#查看内存空间使用情况</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="`+c+`" alt="sudo fdisk -u -l"></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">df</span> <span class="token parameter variable">-h</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="`+d+`" alt="df -h "></p><p>备份命令为</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">export</span> <span class="token assign-left variable">DEVICE_ID</span><span class="token operator">=</span>/dev/sdb
<span class="token builtin class-name">export</span> <span class="token assign-left variable">FILE_NAME</span><span class="token operator">=</span>jetson_nano_jp461_32G
<span class="token comment"># 完整备份：</span>
<span class="token function">sudo</span> <span class="token function">dd</span> <span class="token assign-left variable">if</span><span class="token operator">=</span><span class="token variable">$DEVICE_ID</span> <span class="token assign-left variable">of</span><span class="token operator">=</span><span class="token variable">$FILE_NAME</span>.img <span class="token assign-left variable">bs</span><span class="token operator">=</span>128M 
<span class="token comment"># 压缩备份(推荐)：</span>
<span class="token function">sudo</span> <span class="token function">dd</span> <span class="token assign-left variable">if</span><span class="token operator">=</span><span class="token variable">$DEVICE_ID</span> <span class="token assign-left variable">conv</span><span class="token operator">=</span>sync,noerror <span class="token assign-left variable">bs</span><span class="token operator">=</span>128M <span class="token operator">|</span> <span class="token function">gzip</span> <span class="token parameter variable">-c</span> <span class="token operator">&gt;</span> <span class="token variable">$FILE_NAME</span>.img.gz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><ul><li><code>if=&lt;file_name&gt;</code>：输入文件名，默认为标准输入，即指定源文件。根据“Linux 一切皆文件”的原则，这里需要指定为设备 <code>/dev/xxx</code></li><li><code>of=&lt;file_name&gt;</code>：输出文件名，默认为标准输出，即指定目的文件。这里指定为需要保存的镜像名</li><li><code>bs=&lt;num_bytes&gt;</code>：设置读写速度，块大小为 bytes 个字节。在我电脑上16M最大可以达到60MB/s左右的速度，可以根据自己的情况扩大，减小没必要。</li><li>压缩备份中<code>noerro</code> 代表出错不停止</li></ul></blockquote><p>过程中不会显示进度，如果需要输出，需要再开一个终端运行如下代码，才会在原来的命令下显示进度</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">pkill</span> <span class="token parameter variable">-USR1</span> <span class="token parameter variable">-n</span> <span class="token parameter variable">-x</span> <span class="token function">dd</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="软件安装" tabindex="-1"><a class="header-anchor" href="#软件安装" aria-hidden="true">#</a> 软件安装</h2><h3 id="jtop-系统监控软件" tabindex="-1"><a class="header-anchor" href="#jtop-系统监控软件" aria-hidden="true">#</a> jtop 系统监控软件</h3><p><code>jtop</code> 工具用于监控 Jetson 系统的 CPU/GPU 温度、频率、功耗、风扇转速等信息</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> <span class="token parameter variable">-y</span> python3-pip
<span class="token function">sudo</span> python3 <span class="token parameter variable">-m</span> pip <span class="token function">install</span> jetson-stats  <span class="token comment"># 安装 jtop</span>
<span class="token function">sudo</span> systemctl restart jtop.service       <span class="token comment"># 激活 jtop.service</span>
<span class="token function">sudo</span> jtop                                 <span class="token comment"># 启动</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="`+p+'" alt="jtop"></p><p>修改设置，转到 <code>6CTRL</code>：</p><ul><li>按键 <code>m</code>/<code>p</code> 控制风扇转速</li><li>按键 <code>s</code> 和 <code>e</code> 设置 <code>jetson_clocks Running</code> 和 <code>boot Enable</code> 进行风扇开机自启动</li><li>按键 <code>+</code>/<code>-</code> 修改 NVP Model （功耗模式） 修改设置，转到 <code>6CTRL</code>：</li><li>按键 <code>m</code>/<code>p</code> 控制风扇转速</li><li>按键 <code>s</code> 和 <code>e</code> 设置 <code>jetson_clocks Running</code> 和 <code>boot Enable</code> 进行风扇开机自启动</li><li>按键 <code>+</code>/<code>-</code> 修改 NVP Model （功耗模式）</li></ul><h3 id="ros2" tabindex="-1"><a class="header-anchor" href="#ros2" aria-hidden="true">#</a> ROS2</h3><p>在2020年6月，ROS Foxy Fitzroy发布</p>',20),N={href:"https://github.com/dusty-nv/jetson-containers",target:"_blank",rel:"noopener noreferrer"},y={href:"https://github.com/dusty-nv/jetson-containers#pre-built-container-images",target:"_blank",rel:"noopener noreferrer"},F=e("p",null,[n("选择 ROS2 Foxy ("),e("code",null,"dustynv/ros:foxy-ros-base-l4t-r35.3.1"),n(")")],-1),D={href:"https://github.com/dusty-nv/ros_deep_learning.git",target:"_blank",rel:"noopener noreferrer"},I=e("p",null,"参考文章：",-1),R={href:"https://zhuanlan.zhihu.com/p/440079544",target:"_blank",rel:"noopener noreferrer"};function A(L,S){const s=l("ExternalLinkIcon");return i(),r("div",null,[h,e("p",null,[n("Jetson Nano 自带的系统是 Ubuntu 18.04，可以通过 "),e("a",b,[n("Getting Started with Jetson Nano Developer Kit"),a(s)]),n(" 来烧写系统。该系统自带 "),e("a",v,[n("JetPack 4.6.1"),a(s)]),n("，包括：")]),e("ul",null,[m,e("li",null,[e("a",k,[f,a(s)])]),_,e("li",null,[e("a",g,[B,a(s)])]),e("li",null,[E,n(": 官方提供了一系列镜像 "),e("a",x,[n("Container"),a(s)])])]),j,e("p",null,[e("a",N,[n("jetson-containers"),a(s)]),n(" 中 "),e("a",y,[n("Pre-Built Container Images"),a(s)]),n(" 可以找到")]),F,e("p",null,[n("这里有一个测试项目 "),e("a",D,[n("DNN Inference Nodes for ROS/ROS2"),a(s)])]),I,e("ul",null,[e("li",null,[e("a",R,[n("在Jetson上安装ROS2"),a(s)])])])])}const M=t(u,[["render",A],["__file","index.html.vue"]]);export{M as default};
