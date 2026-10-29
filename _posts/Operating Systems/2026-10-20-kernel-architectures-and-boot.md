---
layout: post
title: "Operating Systems: Classifications, Kernel Architectures, and Booting"
date: 2026-10-20
permalink: /content/learning-log/kernel-architectures-and-boot/
categories: [Learning Log, University, Operating Systems]
tags: [Operating Systems, kernel architecture, boot process, real-time systems, multitasking]
subject: "Operating Systems"
level: "University"
course: "Operating Systems"
semester: "Year 3"
duration: "16 min read"
excerpt: "A study summary of how operating systems are classified, how kernels are organized, and what happens during the Linux boot process."
---

## 1. Classifying operating systems

### Singletasking and multitasking

A **singletasking** operating system executes only one program at a time. If several programs have been started, they must wait for the active one to finish before receiving CPU time.

A **multitasking** operating system lets several processes make progress during the same period. On a machine with several CPU cores, some processes can execute truly in parallel. On a single core, the OS creates *quasi-parallelism*: it switches among processes quickly enough that they appear to run at the same time.

This is useful because processes often wait for events outside the CPU, such as disk I/O, network activity, user input, or a response from another program. While one process is blocked, the OS can run another one instead.

The cost is **context-switch overhead**. Switching requires the OS to save the current process state and restore the next one. The overhead is real, but it is usually much smaller than the time gained by keeping the CPU busy.

| Term | What happens | Important limitation |
| --- | --- | --- |
| **Singletasking** | One program executes; other started programs wait. | CPU time is easily wasted when that program waits for I/O. |
| **Multitasking on one core** | Processes take turns in short time slices. | Only one instruction stream executes at one instant. |
| **Multitasking on many cores** | Some processes can run at the same time. | The number of truly concurrent processes is still bounded by hardware resources. |

### Single-user and multi-user systems

The distinction between **single-user** and **multi-user** is about people rather than programs.

A single-user system allows one person to use the computer at a time. A multi-user system allows several users to work concurrently and share system resources. That makes identification and protection necessary: users need accounts, authentication, and controls that prevent one user from freely reading or changing another user's data and processes.

Modern desktop systems sit somewhere between the two categories. They can keep different users' files and processes separate, but a typical personal computer is still used interactively by one person at a time. A UNIX server, in contrast, is a clearer multi-user example because many users may log in and run processes concurrently.

### What 32-bit and 64-bit mean

The “bit” label here refers to the **length of memory addresses** that the operating system works with internally. With an address length of $n$ bits, there are at most $2^n$ distinct address values.

| Address length | Theoretical address-space size | Familiar interpretation |
| --- | --- | --- |
| 16-bit | $2^{16}$ addresses | Small address spaces from early personal-computer systems. |
| 32-bit | $2^{32}$ addresses | About 4 GiB when addresses refer to bytes. |
| 64-bit | $2^{64}$ addresses | Far larger than the physical RAM in ordinary computers. |

This is an address-space limit, not a statement that the computer has that much installed memory. Hardware, the processor architecture, and the OS may use only part of the theoretical 64-bit range in practice. The essential point is that a longer address provides the OS with a much larger space in which to organize virtual memory.

For example: Window 32 Bit can only have maxium 4GB Ram, although the PC is installed with 8GB Ram.

## 2. Special-purpose classifications

### Real-time operating systems

A **real-time operating system** is a multitasking system that adds mechanisms for meeting timing requirements. Correctness is not only about producing the right result; it is also about producing it before a deadline.

>Real-time doesn't mean the computer runs the fastest, but rather that the work must be completed on time.


The OS uses priorities and predictable scheduling so that important processes receive CPU time within a known limit. Two categories are especially important:

| Type | Deadline requirement | Example consequences of delay |
| --- | --- | --- |
| **Hard real-time** | A deadline must be met. | A late result can be useless or dangerous, such as in anti-lock braking, flight control, or intensive-care monitoring. |
| **Soft real-time** | Some delay is acceptable. | Quality degrades or a small cost occurs, as with multimedia playback or a ticket machine. |

General-purpose desktop operating systems can often offer soft real-time behavior to high-priority work. They cannot reliably promise hard real-time behavior because unpredictable events such as swapping, interrupts, and complex background activity can delay execution.

Common real-time OS examples include QNX, VxWorks, FreeRTOS, Zephyr, RTLinux, and Apache NuttX. Their common application areas are embedded devices, industrial monitoring, robotics, and IoT systems.

### Distributed operating systems

A **distributed operating system** aims to manage processes on several computers while hiding those computers from users and applications. Ideally, the cluster appears as one large computer. This goal is called a **single system image**.

The idea was influential in research systems such as Amoeba, Inferno, Rainbow, and Sprite. It did not become the standard way to build distributed applications: established operating systems were not replaced by distributed OSs, and making a network of machines look completely transparent is difficult.

Today, applications usually make the distributed nature of a system explicit. They often use communication libraries or services to exchange messages across machines. For high-performance computing, **MPI (Message Passing Interface)** is a common standard approach.

For example: OzSTAR Supercomputing is a high performance super computer from Swinburne University [link to OzSTAR](https://supercomputing.swin.edu.au/docs/1-getting_started/Swinburne-HPC.html). 

It have at least 160 standard compute nodes, 10 high memory compute nodes and 22 GPU nodes,...


![](/assets/img/OS/kernel/distributed_OS.png)

## 3. Kernel architectures

The **kernel** contains the operating system's essential functions and provides the core interface to hardware.
- Code inside the kernel runs in *kernel mode* and has broad hardware access.
- Code outside it runs in *user mode* and is restricted to its own virtual-memory space.

The central architectural decision is therefore simple to state: 

> Which services should stay in kernel mode, and which should be separate user-mode services?


## Monolithic kernels

A **monolithic kernel** contains most of the core functions of the operating system within Kernel Mode.

- **Advantage**: Better Performance
  - Because many functions run in Kernel Mode, they can communicate directly without frequently switching back and forth between User Mode and Kernel Mode.

- **Disadvantage:** A faulty Kernel component can cause the entire system to crash.
  - For example: A device driver running in the kernel malfunctions severely, affecting other operating system functions.


![](/assets/img/OS/kernel/monolithic_kernel.png)

> Example of OS with monolithic kernel: **Linux, BSD, MS-DOS, FreeDOS, Windows 95/98/ME, MacOS (until 8.6), OS/2**


Linux supports Kernel Modules, meaning that drivers and functionality can be added without including everything in the original kernel.

However, these modules still run in Kernel Mode, so Linux remains a Monolithic Kernel.

## Microkernels

A **microkernel** keeps only the most essential mechanisms in kernel mode: 
- Basic memory and process management, synchronization, interprocess communication
- A minimal set of drivers needed to start the system. File systems, many drivers
- Other services run as separate user-mode processes.

**Advantages:**
- Components can be exchanged easily.
  - Example: If a driver running in User Mode fails, the system may be able to restart that driver separately, depending on its design.

- Better stability and security in theory. 
  - Because fewer functions run in Kernel Mode, theoretically, error isolation and security could be better.

**Disadvantage:**
- More Context Switches
  - Example: Application $\rightarrow$ Microkernel $\rightarrow$ File Server $\rightarrow$ Microkernel $\rightarrow$ Ứng dụng.
- Complex Development


> Example: **AmigaOS, MorphOS, Tru64, QNX Neutrino, Symbian OS, GNU HURD**

## Hybrid kernels / Macrokernels

A **hybrid kernel** is a practical compromise. Some functions are placed in Kernel Mode to improve performance, while others can be organized as separate services.

For example: The kernel of Windows NT 4 contains the Graphics Device Interface.
- Advantage: Increased performance
- Disadvantage: Buggy graphics drivers cause frequent crashes

>

| Architecture | Main idea | Strength | Risk or cost |
| --- | --- | --- | --- |
| **Monolithic** | Most services run in kernel mode. | Efficient communication between core services. | A faulty kernel component has a large blast radius. |
| **Microkernel** | Keep the kernel small; move services to user mode. | Better isolation in principle. | More communication and context-switch overhead. |
| **Hybrid** | Keep selected services in the kernel for performance. | Balances practical performance and separation. | The boundary can become complex, and in-kernel bugs remain serious. |

## Thin Kernel
Thin Kernels are used in several Real-Time architectures:
- The RT Kernel handles Scheduling.
- Real-Time Processes have the highest priority.
- The kernel of a typical operating system operates at a lower priority, as a background process.

The goal is to reduce latency for critical tasks.

## Nano Kernel
Nano Kernels allow multiple kernels from different operating systems to run simultaneously.

>Additionally, Pico Kernel, Femto Kernel, and Atto Kernel are primarily marketing terms used to emphasize the kernel's extremely small size.

![](/assets/img/OS/kernel/thin$nano_kernel.png)


## 4. The layered view of an operating system

Operating systems are often described through **layers**. Each layer is like an abstract machine: it offers services to the layer above and relies on services from the layer below.

At a minimum, this view contains three broad layers:

1. The innermost layer handles hardware-dependent parts of the OS.
2. The central layer provides basic I/O services, libraries, and device interfaces.
3. The outermost layer contains applications and the user interface.

Layers communicate through well-defined interfaces. A layer can call functions provided by the next layer inside it, and it exposes its own functions to the next layer outside it. The available services and the rules for using them form a **protocol**.

For Linux/UNIX, a useful learning model is:

| Layer | Role |
| --- | --- |
| 0: Hardware | CPU, memory, storage, network, and devices. |
| 1: Kernel architecture | The privileged core that manages hardware access. |
| 2: Kernel functions | Memory, processes, scheduling, files, devices, and communication. |
| 3: Standard library | Interfaces such as C-library wrappers around OS services. |
| 4: Shell | A command-oriented user interface and scripting environment. |
| 5: User | The person or program requesting work from the system. |

This is a logical model, not a rule that every program must follow perfectly.

>For example, a Linux application may call a standard-library wrapper such as one from `glibc`, or it may invoke a system call more directly.

## 5. Booting a Linux/UNIX system

The **boot process** or **bootstrapping** is the sequence from starting the computer to handing control to the OS and, finally, to users and their processes. The details vary by platform.

## Linux-oriented sequence for BIOS- and UEFI-based PCs.

### Step 1: Switch on the Computer
- Power is supplied to the mainboard and CPU.
- Modern computers may have autonomous subsystems (Intel ME, AMD PSP) for remote management and Wake-on-LAN.
- Drawback: Potential security risks.

### Step 2: Start Firmware and POST
- Firmware starts: **BIOS** (older PCs) or **UEFI** (modern PCs).
- **POST (Power-On Self-Test)** checks CPU, cache, RAM and I/O devices.
- Errors may be reported by messages or beeps.

### Step 3: Start the Boot Loader
- Firmware selects a boot device (SSD, HDD, USB or network).
- The boot loader loads the operating system.
  - **MBR:** Boot loader in the Master Boot Record.
  - **GPT/UEFI:** Boot loader in the EFI System Partition (ESP).
  - Examples: GRUB, Windows Boot Manager, Clover.

### Step 4: Start Kernel and Temporary Root File System
- The boot loader loads the kernel into RAM.
- **initrd/initramfs** provides a temporary root file system with drivers and tools needed to access the real root file system.

### Step 5: Mount the Real Root File System
- The system checks and, if necessary, repairs file-system errors.
- The real root file system (`/`) replaces the temporary one.
- Other file systems (e.g. `/home`) can be mounted.

### Step 6: Start init/systemd
- The kernel starts the first user-mode process: **init/systemd (PID 1)**.
- It starts system services such as SSH, cron and web servers.
- systemd supports parallel service startup, logging and service restart.

### Step 7: Pass Control to Users
- The kernel continues managing hardware and system calls.
- **getty** provides text-based login (typically TTY1–TTY6, one process per console).
- After login, a shell such as bash or zsh starts.
- Graphical login managers (GDM, LightDM) start desktop sessions.

### Boot Sequence

```text
Power On
   ↓
BIOS/UEFI + POST
   ↓
Boot Loader
   ↓
Kernel + initramfs
   ↓
Real Root File System (/)
   ↓
init/systemd (PID 1)
   ↓
Login → Shell / Desktop
```

## macOS
- **Intel Mac:** EFI/UEFI → boot.efi → XNU.
- **Apple Silicon:** Boot ROM → LLB → iBoot → XNU.
- Both start **launchd (PID 1)** and then the user session.