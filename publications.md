---
layout: default
title: Publications
permalink: /publications/
---

<div class="page-header">
    <h1>Publications & Research</h1>
    <p class="page-description">My academic publications and research contributions</p>
</div>

<div class="content">
    <section class="publications-section">
        
        <div class="publication-item">
            <h3 class="pub-title"><a href="https://arxiv.org/abs/2512.04395">Fourier-Attentive Representation Learning: A Fourier-Guided Framework for Few-Shot Generalization in Vision-Language Models</a></h3>
            <div class="pub-venue">arXiv</div>
            <div class="pub-date">2025</div>
            <div class="pub-authors">
                <strong>Hieu Dinh Trung Pham</strong>, Huy Minh Nhat Nguyen, Cuong Tuan Nguyen
            </div>
            <div class="pub-details">
                <span class="detail-label">arXiv ID:</span> 2512.04395
            </div>
            <div class="pub-abstract">
                <details>
                    <summary>Abstract</summary>
                    <p>Large-scale pre-trained Vision-Language Models (VLMs) have demonstrated strong few-shot learning capabilities. However, these methods typically learn holistic representations where an image's domain-invariant structure is implicitly entangled with its domain-specific style. This presents an opportunity to further enhance generalization by disentangling these visual cues. In this paper, we propose Fourier-Attentive Representation Learning (FARL), a novel framework that addresses this by explicitly disentangling visual representations using Fourier analysis. The core of our method is a dual cross-attention mechanism, where learnable representation tokens separately query an image's structural features (from the phase spectrum) and stylistic features (from the amplitude spectrum). This process yields enriched, disentangled tokens that are then injected deep into the VLM encoders to guide adaptation. Our design, which includes an asymmetric injection strategy, forces the model to learn a more robust vision-language alignment. Extensive experiments on 15 datasets demonstrate the effectiveness of our approach.</p>
                </details>
            </div>
        </div>

        <div class="publication-item">
            <h3 class="pub-title"><a href="https://openaccess.thecvf.com/content/ICCV2025W/AICity/papers/Nguyen_A_Real-time_Vehicle_Detection_Pipeline_with_Data-centric_Enhancements_and_Multi-stage_ICCVW_2025_paper.pdf">A Real-time Vehicle Detection Pipeline with Data-centric Enhancements and Multi-stage DETR Distillation</a></h3>
            <div class="pub-venue">ICCV 2025 Workshops (AI City Challenge)</div>
            <div class="pub-date">October 2025</div>
            <div class="pub-authors">
                Huy Minh Nhat Nguyen, <strong>Hieu Dinh Trung Pham</strong>, Khang Minh Le, Cuong Tuan Nguyen
            </div>
            <div class="pub-details">
                <span class="detail-label">Pages:</span> 5382-5389
            </div>
            <div class="pub-abstract">
                <details>
                    <summary>Abstract</summary>
                    <p>Real-time vehicle detection often requires trading off accuracy for speed. To validate a solution that excels on both fronts, we adopt fisheye imagery, a domain where extreme radial distortion and scale variation defeat standard detectors, as a rigorous testbed. Our pipeline comprises three key stages:(1) Multi-stage DETR Distillation, a four-phase knowledge transfer leveraging KD-DETR's fixed distillation queries with separate head-and feature-level stages to avoid gradient conflicts and ensure progressive learning;(2) Data-centric Enhancements, creating a diverse training pool via Co-DETR pseudo-labeling, CycleGAN-Turbo day-to-night style transfer, and object-level flash/blur augmentations; and (3) Adaptive Sample Mining, which dynamically upsamples complex examples to sharpen the model's focus. When paired with D-FINE-M, our method achieves an F1 score of 0.6318 at 145 FPS on the AI City Challenge 2024 Track 4 test set, and with D-FINE-N, it reaches 781 FPS with an F1-score of 0.5597, all measured on an RTX 4090. Evaluated on the challenging FishEye8K benchmark, our approach delivers strong accuracy while maintaining real-time FPS. By ignoring fisheye distortions and treating them as a domain-agnostic stress test, we demonstrate that this data-centric, multi-stage distillation framework generalizes seamlessly to standard vehicle and broader object detection tasks, offering a unified solution for high-precision, real-time vision systems.</p>
                </details>
            </div>
        </div>

    </section>

    <section class="research-interests">
        <h2>Research Interests</h2>
        <div class="interests-grid">
            <div class="interest-card">
                <h4>Few-Shot Learning</h4>
                <p>Developing methods for learning from limited data samples</p>
            </div>
            <div class="interest-card">
                <h4>Vision-Language Models</h4>
                <p>Bridging computer vision and natural language processing</p>
            </div>
            <div class="interest-card">
                <h4>Real-time Computer Vision</h4>
                <p>Efficient algorithms for real-world deployment</p>
            </div>
            <div class="interest-card">
                <h4>Model Compression</h4>
                <p>Knowledge distillation and model optimization</p>
            </div>
        </div>
    </section>
</div>
