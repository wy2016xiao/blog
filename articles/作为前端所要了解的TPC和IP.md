# 作为前端所要了解的TCP/IP

作为一名前端，不光要掌握javascript、html、css三剑客，更要掌握一些基础的网络通信、运维等等知识。

前端开发中，一定会接触请求。无论是接口数据请求、页面请求、图片请求，他们都属于网络通信。

你一定见过许许多多网络通信方面的英文缩写，http、https、dns、ip、tcp等等。

今天就来谈一谈作为前端所要了解的TCP和IP方面的基础知识。

## 网络分层

网络通信的工作很繁杂，因而网络通信协议也非常多。但实际运作过程中，为了方便进行工作，我们通常将它分为不同的层，每一层都有各自的分工以及协议。

>网络分层就是将网络节点所要完成的数据的发送或转发、打包或拆包，控制信息的加载或拆出等工作，分别由不同的硬件和软件模块去完成。这样可以将往来通信和网络互连这一复杂的问题变得较为简单。

它类似于如今的快递系统，由电商、交通运输系统、快递员等等一层一层划分。而这些协议就类似于他们的工作协议。OSI则是目前最权威的网络分层模型。

### OSI

>开放系统互连参考模型 (Open System Interconnect 简称OSI）是国际标准化组织(ISO)和国际电报电话咨询委员会(CCITT)联合制定的开放系统互连参考模型，为开放式互连信息系统提供了一种功能结构的框架。它从低到高分别是：物理层、数据链路层、网络层、传输层、会话层、表示层和应用层。

但在实际应用中，我们的网络分层和OSI有些许区别。

它们分为五层：应用层、传输层、网络层、链路层和物理层。

### 物理层
功能：传输信息的介质规格、将数据以实体呈现并传输的规格、接头规格　
1. 该层包括物理连网媒介，如电缆连线、连接器、网卡等。　
2. 物理层的协议产生并检测电压以便发送和接收携带数据的信号。
3. 尽管物理层不提供纠错服务，但它能够设定数据传输速率并监测数　

例：在你的桌面P C 上插入网络接口卡，你就建立了计算机连网的基础。换言之，你提供了一个物理层。

### 链路层

功能：同步、查错、制定MAC方法　
1. 它的主要功能是将从网络层接收到的数据分割成特定的可被物理层传输的帧。　
2. 帧(Frame)是用来移动数据的结构包，它不仅包括原始（未加工）数据，或称“有效荷载”，还包括发送方和接收方的网络地址以及纠错和控制信息。其中的地址确定了帧将发送到何处，而纠错和控制信息则确保帧无差错到达。　
3. 通常，发送方的数据链路层将等待来自接收方对数据已正确接收的应答信号。　
4. 数据链路层控制信息流量，以允许网络接口卡正确处理数据。　
5. 数据链路层的功能独立于网络和它的节点所采用的物理层类型。　


### 网络层
功能：定址、选择传送路径　
1. 网络层通过综合考虑发送优先权、网络拥塞程度、服务质量以及可选路由的花费来决定从一个网络中节点A 到另一个网络中节点B 的最佳路径。　
2. 在网络中，“路由”是基于编址方案、使用模式以及可达性来指引数据的发送。　
3. 网络层协议还能补偿数据发送、传输以及接收的设备能力的不平衡性。为完成这一任务，网络层对数据包进行分段和重组。　
4. 分段和重组 是指当数据从一个能处理较大数据单元的网络段传送到仅能处理较小数据单元的网络段时，网络层减小数据单元的大小的过程。重组是重构被分段的数据单元。　

### 传输层
功能：编定序号、控制数据流量、查错与错误处理，确保数据可靠、顺序、无错地从A点到传输到B 点　
1. 因为如果没有传输层，数据将不能被接受方验证或解释，所以，传输层常被认为是O S I 模型中最重要的一层。　
2. 传输协议同时进行流量控制或是基于接收方可接收数据的快慢程度规定适当的发送速率。　
3. 传输层按照网络能处理的最大尺寸将较长的数据包进行强制分割并编号。例如：以太网无法接收大于1 5 0 0 字节的数据包。发送方节点的传输层将数据分割成较小的数据片，同时对每一数据片安排一序列号，以便数据到达接收方节点的传输层时，能以正确的顺序重组。该过程即被称为排序。　
4. 在网络中，传输层发送一个A C K （应答）信号以通知发送方数据已被正确接收。如果数据有错或者数据在一给定时间段未被应答，传输层将请求发送方重新发送数据。

### 应用层
指网络操作系统和具体的应用程序，对应WWW服务器、FTP服务器等应用软件　
1. 术语“应用层”并不是指运行在网络上的某个特别应用程序，而是提供了一组方便程序开发者在自己的应用程序中使用网络功能的服务。　
2. 应用层提供的服务包括文件传输（FTP）、文件管理以及电子邮件的信息处理（SMTP）等。

我们经常见到的TCP/IP协议中，TCP属于传输层，而IP属于网络层。

## IP
>IP（Internet Protocol）协议是TCP/IP协议族的核心组成部分，是目前应用最广的网络互联协议。IP层对应于ISO/OSI七层参考模型中的网络层。通过IP数据包和IP地址屏蔽掉了不同的物理网络（如以太网、令牌环网等）的帧格式、地址格式等各种底层物理网络细节，使得各种物理网络的差异性对上层协议不复存在，从而使网络互联成为可能。IP协议的主要功能有：无连接数据报传送、数据报路由选择和差错控制。

### IP地址
IP，全称互联网协议地址，是指IP地址，意思是分配给用户上网使用的网际协议（英语：InternetProtocol,IP）的设备的数字标签。常见的IP地址分为IPv4与IPv6两大类，但是也有其他不常用的小分类。

你可以将IP地址理解为你在互联网上的门牌号码。互联网上，每一个终端都有其唯一的IP地址，用来标明自己在互联网上的位置。

### V4和V6
我们通常见到的IPv4和IPv6，指的是IP协议的版本号。
IPv4的地址位数为32位，也就是说，最多有2^23台计算机可以连到Internet上。

但随着互联网的普及，2^23显然不太够用，于是为了扩大地址空间，拟通过IPv6重新定义地址空间。按保守方法估算，IPv6实际可分配的地址，整个地球的每平方米面积上仍可分配1000多个地址。和IPv4相比，IPv6的主要改变就是地址的长度为128位，也就是说可以有2^128个IP地址。

## TCP
传输控制协议（TCP，Transmission Control Protocol）是为了在不可靠的互联网络上提供可靠的端到端字节流而专门设计的一个传输协议。

简单说，TCP协议的作用是，保证数据通信的完整性和可靠性，防止丢包。
### 链接的建立与释放

### 数据传输
### 慢启动

## 参考

[TCP 协议简介](http://www.ruanyifeng.com/blog/2017/06/tcp-protocol.html)  

---
如果有任何疑问或错误，欢迎留言进行提问或给予修正意见。

如果喜欢或对你有所帮助，欢迎Star[我的博客](https://github.com/wy2016xiao/blog)，对作者是一种鼓励和推进。

也欢迎关注[我的掘金](https://juejin.im/user/583bbd74ac502e006ea81f99)，浏览更多优质文章。