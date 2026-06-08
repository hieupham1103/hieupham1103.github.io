---
layout: post
title: "DSA: Sorting Arrays"
date: 2026-03-22
permalink: /content/learning-log/dsa-array-sorting/
categories: [Learning Log, University, DSA]
tags: [sorting, selection-sort, insertion-sort, heap-sort, merge-sort, quick-sort, radix-sort]
subject: "Data Structures and Algorithms"
level: "University"
course: "Data Structures and Algorithms"
semester: "Year 2"
excerpt: "A study note on the array sorting algorithms in my DSA: selection, insertion, heap, merge, quick, and radix sort."
---

This note turns the sorting part of my DSA course into a comparison-oriented study log. The algorithms are not just code templates; each one has a different invariant and a different reason to exist.

## Selection Sort

Selection sort repeatedly chooses the smallest element from the unsorted suffix and places it at the front.

```cpp
void selectionSort(int a[], int n) {
    for (int i = 0; i < n; i++) {
        int minIndex = i;

        for (int j = i + 1; j < n; j++) {
            if (a[j] < a[minIndex]) {
                minIndex = j;
            }
        }

        swap(a[i], a[minIndex]);
    }
}
```

The invariant after iteration `i` is:

> The prefix `a[0..i]` contains the smallest `i + 1` elements in sorted order.

Selection sort is easy to reason about, but it does not become faster when the array is almost sorted. It still scans the remaining suffix to find the minimum. Its time complexity is $O(n^2)$.

## Insertion Sort

Insertion sort builds a sorted prefix one element at a time. At step `i`, it inserts `a[i]` into the correct position inside `a[0..i-1]`.

```cpp
void insertionSort(int a[], int n) {
    for (int i = 1; i < n; i++) {
        int key = a[i];
        int j = i - 1;

        while (j >= 0 && a[j] > key) {
            a[j + 1] = a[j];
            j--;
        }

        a[j + 1] = key;
    }
}
```

The invariant is:

> Before each iteration, the prefix before `i` is already sorted.

Insertion sort is still $O(n^2)$ in the worst case, but it is excellent for nearly sorted data because it only shifts elements that are actually out of place.

## Heap Sort

Heap sort uses an array as a binary heap. For zero-based indexing:

- left child: `2 * i + 1`
- right child: `2 * i + 2`
- parent: `(i + 1) / 2 - 1`

The algorithm has two phases:

1. Build a max heap.
2. Repeatedly move the largest element to the end and restore the heap.

The core operation is `heapify`: compare a node with its children, swap it with the larger child if needed, then continue fixing the affected subtree.

Explanation that I want to remember:

- Nodes from `n / 2` onward are leaves, so they already satisfy the heap property.
- That is why heap construction starts at `n / 2 - 1` and moves backward to the root.
- After swapping the root with the last unsorted element, only the root may violate the heap property, so heapify starts from index `0`.

Heap sort runs in $O(n \log n)$ and sorts in place, but it is usually not stable.

```cpp
void heapSort(int arr[], int n) {
	for (int i = n/2 - 1; i >= 0; i--) {
		heapify(arr, n, i);
	}
	for (int i = n - 1; i > 0; i--) {
		swap(arr[0], arr[i]); 
		heapify(arr, i, 0); 
	}
}
void heapify(int arr[], int n, int i) {
	int largest = i; 
	int left = 2 * i + 1;
	int right = 2 * i + 2; 
	if (left < n && arr[left] > arr[largest]){
		largest = left;
	}
	if (right < n && arr[right] > arr[largest]) {
		largest = right;
	}
	if (largest != i) {
		swap(arr[i], arr[largest]);
		heapify(arr, n, largest);
	}
```

## Merge Sort

Merge sort is the cleanest divide-and-conquer sort:

1. Split the array into two halves.
2. Sort both halves recursively.
3. Merge two sorted halves.

The merge step is the heart of the algorithm. It keeps two pointers, one for each sorted half, and repeatedly copies the smaller current element into a temporary array.

The invariant during merge:

> The temporary array is always sorted and contains the smallest elements already consumed from the two halves.

Merge sort is $O(n \log n)$ in all cases, but it needs extra memory for merging. It is a good default when stable sorting matters.

```
void mergeSort(int arr[], int left, int right) {
	if (left < right) {
		int mid = left + (right - left) / 2;
		mergeSort(arr, left, mid);
		mergeSort(arr, mid + 1, right);
		merge(arr, left, mid, right);
	}
}

void merge(int arr[], int left, int mid, int right) {
	int i = left, j = mid + 1, k = 0;
	int temp[right - left + 1]; 
	while (i <= mid && j <= right) {
		if (arr[i] <= arr[j]) {
			temp[k++] = arr[i++];
		} else
			temp[k++] = arr[j++];
		}
		while (i <= mid) {
			temp[k++] = arr[i++];
		}
		while (j <= right) {
			temp[k++] = arr[j++]
		}
		
		for (int x = 0; x < k; x++) {
			arr[left + x] = temp[x];
		}
	}
```

## Quick Sort

Quick sort chooses a pivot, partitions the array around it, then recursively sorts the left and right parts.

```cpp
void quickSort(vector<int>& arr, int low, int high) {
	if (low < high) {
		int pivotIndex = partition(arr, low, high);
		quickSort(arr, low, pivotIndex1); // Sort left part
		quickSort(arr, pivotIndex + 1, high); // Sort right part
	}
}

int partition(vector<int>& arr, int low, int high) {
	int pivot = arr[high]; // Choose last element as pivot
	int i = low - 1; // Index for smaller elements
	for (int j = low; j < high; j++) {
		if (arr[j] < pivot) {
			i++; 
			swap(arr[i], arr[j]); // Swap smaller elements to the left
		}
	}
	swap(arr[i + 1], arr[high]); // Place pivot in the correct position
	return i + 1; // Return pivot index
}
```

The partition invariant is:

- elements at or before `i` are smaller than the pivot;
- elements between `i + 1` and `j - 1` are not yet placed in the smaller region;
- elements from `j` onward are unprocessed.

Quick sort is fast on average: $O(n \log n)$. The dangerous case is repeatedly choosing a bad pivot, which can make it $O(n^2)$. The **median-of-three** strategy: choose the median of the first, middle, and last elements as the pivot. This reduces the chance of the worst case on already sorted input.

## Radix Sort

Radix sort is different from comparison sorts. Instead of comparing whole values, it sorts by digits from least significant to most significant. Each digit pass uses a stable counting sort.

The important word is **stable**. When sorting by the tens digit, the order created by the ones digit must be preserved. That is why the counting-sort placement step often traverses from right to left.

Radix sort is useful when:

- keys are integers or fixed-format strings;
- the number of digits is bounded;
- stable digit-level sorting is available.

Its complexity is usually written as $O(d(n + b))$, where $d$ is the number of digits and $b$ is the base.

## My Sorting Map

When I review sorting, I want to connect each algorithm with one sentence:

- Selection sort: repeatedly select the minimum.
- Insertion sort: maintain a sorted prefix.
- Heap sort: repeatedly extract the maximum from a heap.
- Merge sort: sort halves, then merge.
- Quick sort: partition around a pivot.
- Radix sort: sort stable digit by digit.


> If I know the invariant, I can reconstruct the code. If I only memorize the code, I forget it too easily.
