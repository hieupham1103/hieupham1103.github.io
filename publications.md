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
            <h3 class="pub-title"><a href="https://arxiv.org/pdf/2608.09493">GeoRoute: Geometry-Aware Hybrid Inference for Traffic Future-Frame Prediction</a></h3>
            <div class="pub-venue">European Conference on Computer Vision 2026 Workshops</div>
            <div class="pub-date">August 2026</div>
            <div class="pub-authors">
                Khang Minh Le, <strong>Hieu Dinh Trung Pham</strong>, Luu Thanh Danh, Nam-Tien Le, Hieu Anh Ngo, Phuong Huu Vu Tran, Son Nguyen Minh Le, Nguyen Trong Nghia, Tu Tran Thi Cam, Huy Minh Nhat Nguyen, Cuong Tuan Nguyen
            </div>
            <div class="pub-details">
                <span class="detail-label">Preprint on:</span>  Arxiv
            </div>
            <div class="pub-abstract">
                <details>
                    <summary>Abstract</summary>
                    <p>Long-horizon future-frame prediction is important for autonomous driving, traffic surveillance, and intelligent transportation systems, yet remains challenging due to temporal ghosting, geometry drift, and inconsistent object motion. Recent latent video diffusion models have achieved impressive visual quality, but directly applying them to structured traffic scenes often leads to unstable geometry and degraded temporal coherence over extended horizons. We present a training-free inference framework that stabilizes reliable static structure in pretrained video predictions through multi-frame temporal context and view-conditioned routing. For front-camera videos, our method refines generated futures with a multi-frame depth-layered renderer that projects static geometry from observed history frames while preserving dynamic regions from the generative base model. For heterogeneous traffic views, a frozen vision-language model infers a coarse camera group from the observed clip and selects a specialized motion-based predictor. The framework requires neither retraining nor fine-tuning of the underlying video model and can be applied directly to pretrained generators. We validate the proposed framework on the AI City Challenge Track 5 benchmark, where our final system achieves competitive performance among the top-ranked teams. These results demonstrate that geometry-aware inference-time refinement and view-conditioned hybrid inference can improve static-geometry stability and low-level structural fidelity without changing the original model architecture.</p>
                </details>
            </div>
        </div>

        <div class="publication-item">
            <h3 class="pub-title"><a href="https://arxiv.org/pdf/2608.09474">FaLCon: Facet-Anchored Retrieval with Late Consensus for Sim2Real Text-Based Person Anomaly Search</a></h3>
            <div class="pub-venue">European Conference on Computer Vision 2026 Workshops</div>
            <div class="pub-date">August 2026</div>
            <div class="pub-authors">
                <strong>Hieu Dinh Trung Pham</strong>, Phuong Huu Vu Tran, Thuan Duc Mai, Son Nguyen Minh Le, Khang Le Minh, Hoang Vo, Minh-Chi Phung, Huy Minh Nhat Nguyen, Cuong Tuan Nguyen
            </div>
            <div class="pub-details">
                <span class="detail-label">Preprint on:</span>  Arxiv
            </div>
            <div class="pub-abstract">
                <details>
                    <summary>Abstract</summary>
                    <p>Text-based person anomaly search requires retrieving real-world pedestrian images from detailed natural-language descriptions using models trained primarily on synthetic data. This Sim2Real setting is particularly challenging because visually similar candidates may differ only in subtle actions, object interactions, or appearance attributes, while applying multimodal large language models to the entire gallery is computationally expensive. We propose an anchor-constrained coarse-to-fine retrieval framework that combines global semantic matching with fine-grained verification. First, each query is represented by its original caption, a structured concatenation, and several semantic facets. Heterogeneous vision-language retrievers are then integrated through robust per-query score calibration and soft claim-aware fusion. Full and concatenated captions serve as anchors to preserve candidate recall, whereas appearance, action, and object facets provide bounded corrective evidence. The resulting candidate pool is further refined by a discriminative Qwen3 reranker and two complementary semantic verification modules based on anomaly-aware cloze completion and multi-agent evidence reasoning. Finally, an uncertainty-gated consensus module adaptively reweights the three experts on ambiguous queries. Experiments on the PAB benchmark show that the proposed soft claim-aware retrieval achieves 86.44% mAP@10, substantially outperforming individual retrieval backbones. The complete framework further improves performance to 95.41% mAP@10, 94.44% R@1, and 99.09% R@5. These results demonstrate that preserving strong global retrieval while restricting expensive semantic reasoning to a small candidate pool is effective for fine-grained Sim2Real person anomaly search. Our code will be available on Github.</p>
                </details>
            </div>
        </div>
        
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
            <div class="pub-venue">2025 IEEE/CVF International Conference on Computer Vision Workshops (ICCVW)</div>
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
