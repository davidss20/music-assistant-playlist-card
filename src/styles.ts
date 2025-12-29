/**
 * Music Assistant Playlist Card - Styles
 * Mushroom Cards inspired styling
 * Includes RTL support for Hebrew and Arabic
 */

import { css } from 'lit';

export const cardStyles = css`
  :host {
    --mdc-icon-size: 20px;
    --playlist-card-spacing: 12px;
    --playlist-card-border-radius: 12px;
    --playlist-image-size: 100%;
    --playlist-item-gap: 12px;
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: inherit;
  }

  /* RTL Support */
  :host([dir="rtl"]) {
    direction: rtl;
  }

  :host([dir="rtl"]) .card-header {
    flex-direction: row-reverse;
  }

  :host([dir="rtl"]) .speaker-button {
    flex-direction: row-reverse;
    text-align: right;
  }

  :host([dir="rtl"]) .speaker-button-check {
    margin-left: 0;
    margin-right: auto;
  }

  :host([dir="rtl"]) .queue-item {
    flex-direction: row-reverse;
    text-align: right;
  }

  :host([dir="rtl"]) .now-playing-info {
    text-align: center;
  }

  :host([dir="rtl"]) .secondary-controls {
    flex-direction: row-reverse;
  }

  :host([dir="rtl"]) .secondary-controls-left,
  :host([dir="rtl"]) .secondary-controls-right {
    flex-direction: row-reverse;
  }

  :host([dir="rtl"]) .volume-container {
    flex-direction: row-reverse;
  }

  :host([dir="rtl"]) .progress-time {
    flex-direction: row-reverse;
  }

  :host([dir="rtl"]) .tab-button {
    flex-direction: column;
  }

  :host([dir="rtl"]) .playlist-info {
    text-align: center;
  }

  ha-card {
    overflow: hidden;
    height: 100%;
    min-height: inherit;
    flex: 1;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  }

  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--playlist-card-spacing);
    padding-bottom: 0;
  }

  .card-title {
    font-size: 1.2rem;
    font-weight: 500;
    color: var(--primary-text-color);
    margin: 0;
  }

  .card-content {
    padding: var(--playlist-card-spacing);
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .card-content::-webkit-scrollbar {
    width: 6px;
  }

  .card-content::-webkit-scrollbar-track {
    background: transparent;
  }

  .card-content::-webkit-scrollbar-thumb {
    background: var(--divider-color, rgba(0, 0, 0, 0.2));
    border-radius: 3px;
  }

  .card-content::-webkit-scrollbar-thumb:hover {
    background: var(--secondary-text-color);
  }

  /* Speaker Selector */
  .speaker-selector {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px;
    background: var(--card-background-color, var(--ha-card-background));
    border-radius: var(--playlist-card-border-radius);
    margin-bottom: var(--playlist-card-spacing);
  }

  .speaker-selector ha-icon {
    color: var(--primary-text-color);
    opacity: 0.7;
  }

  .speaker-select {
    flex: 1;
    background: transparent;
    border: none;
    color: var(--primary-text-color);
    font-size: 14px;
    font-family: inherit;
    cursor: pointer;
    padding: 8px 12px;
    border-radius: 8px;
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.1));
    appearance: none;
    -webkit-appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24'%3E%3Cpath fill='%23888' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
    padding-right: 36px;
  }

  .speaker-select:hover {
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.15));
  }

  .speaker-select:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--primary-color);
  }

  .speaker-select option {
    background: var(--card-background-color, #fff);
    color: var(--primary-text-color);
  }

  /* ==========================================================================
     Playlist Toolbar
     ========================================================================== */

  .playlist-toolbar {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 12px;
    flex-shrink: 0;
  }

  .search-container {
    position: relative;
    width: 100%;
  }

  .search-input {
    width: 100%;
    padding: 10px 12px 10px 40px;
    border: none;
    border-radius: 10px;
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.1));
    color: var(--primary-text-color);
    font-size: 14px;
    font-family: inherit;
    outline: none;
    transition: box-shadow 0.2s ease;
    box-sizing: border-box;
  }

  :host([dir="rtl"]) .search-input {
    padding: 10px 40px 10px 12px;
  }

  .search-input::placeholder {
    color: var(--secondary-text-color);
  }

  .search-input:focus {
    box-shadow: 0 0 0 2px var(--primary-color);
  }

  .search-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    --mdc-icon-size: 20px;
    color: var(--secondary-text-color);
    pointer-events: none;
  }

  :host([dir="rtl"]) .search-icon {
    left: auto;
    right: 12px;
  }

  .toolbar-actions {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .filter-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 8px 12px;
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.1));
    border: none;
    border-radius: 8px;
    color: var(--secondary-text-color);
    font-size: 13px;
    font-family: inherit;
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;
  }

  .filter-button:hover {
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.15));
  }

  .filter-button.active {
    background: color-mix(in srgb, var(--primary-color) 20%, transparent);
    color: var(--primary-color);
  }

  .filter-button ha-icon {
    --mdc-icon-size: 18px;
  }

  .sort-dropdown {
    position: relative;
  }

  .sort-menu {
    position: absolute;
    top: 100%;
    right: 0;
    margin-top: 4px;
    background: var(--card-background-color, var(--ha-card-background));
    border-radius: 10px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    z-index: 100;
    overflow: hidden;
    min-width: 160px;
  }

  :host([dir="rtl"]) .sort-menu {
    right: auto;
    left: 0;
  }

  .sort-option {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    padding: 10px 14px;
    background: transparent;
    border: none;
    color: var(--primary-text-color);
    font-size: 14px;
    font-family: inherit;
    cursor: pointer;
    text-align: left;
    transition: background 0.2s ease;
  }

  :host([dir="rtl"]) .sort-option {
    text-align: right;
  }

  .sort-option:hover {
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.05));
  }

  .sort-option.active {
    color: var(--primary-color);
  }

  .sort-option ha-icon {
    --mdc-icon-size: 18px;
  }

  .view-toggle {
    display: flex;
    align-items: center;
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.1));
    border-radius: 8px;
    overflow: hidden;
  }

  .view-button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    background: transparent;
    border: none;
    color: var(--secondary-text-color);
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .view-button:hover {
    background: rgba(0, 0, 0, 0.05);
  }

  .view-button.active {
    background: var(--primary-color);
    color: var(--text-primary-color, #fff);
  }

  .view-button ha-icon {
    --mdc-icon-size: 18px;
  }

  .toolbar-spacer {
    flex: 1;
  }

  /* Playlist Grid */
  .playlist-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: var(--playlist-item-gap);
  }

  .playlist-grid.columns-2 {
    grid-template-columns: repeat(2, 1fr);
  }

  .playlist-grid.columns-3 {
    grid-template-columns: repeat(3, 1fr);
  }

  .playlist-grid.columns-4 {
    grid-template-columns: repeat(4, 1fr);
  }

  .playlist-grid.columns-5 {
    grid-template-columns: repeat(5, 1fr);
  }

  .playlist-grid.columns-6 {
    grid-template-columns: repeat(6, 1fr);
  }

  /* Playlist List View */
  .playlist-list {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .playlist-list .playlist-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 12px;
    padding: 8px;
    border-radius: 10px;
  }

  .playlist-list .playlist-item:hover {
    transform: none;
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.05));
  }

  .playlist-list .playlist-image-container {
    width: 56px;
    height: 56px;
    padding-top: 0;
    flex-shrink: 0;
    border-radius: 8px;
  }

  .playlist-list .playlist-info {
    flex: 1;
    min-width: 0;
    padding: 0;
    text-align: left;
  }

  :host([dir="rtl"]) .playlist-list .playlist-info {
    text-align: right;
  }

  .playlist-list .playlist-name {
    font-size: 14px;
  }

  .playlist-list .play-overlay {
    position: relative;
    width: 40px;
    height: 40px;
    background: transparent;
    opacity: 1;
    flex-shrink: 0;
  }

  .playlist-list .play-button {
    width: 40px;
    height: 40px;
    opacity: 0.7;
    transition: opacity 0.2s ease, transform 0.2s ease;
  }

  .playlist-list .playlist-item:hover .play-button {
    opacity: 1;
  }

  /* Playlist Item */
  .playlist-item {
    position: relative;
    cursor: pointer;
    border-radius: var(--playlist-card-border-radius);
    overflow: hidden;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    background: var(--card-background-color, var(--ha-card-background));
  }

  .playlist-item:hover {
    transform: scale(1.03);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .playlist-item:active {
    transform: scale(0.98);
  }

  .playlist-image-container {
    position: relative;
    width: 100%;
    padding-top: 100%; /* 1:1 Aspect Ratio */
    overflow: hidden;
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.1));
  }

  .playlist-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .playlist-item:hover .playlist-image {
    transform: scale(1.05);
  }

  .playlist-placeholder {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.1));
  }

  .playlist-placeholder ha-icon {
    --mdc-icon-size: 48px;
    color: var(--secondary-text-color);
    opacity: 0.5;
  }

  /* Play Overlay */
  .play-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.4);
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  .playlist-item:hover .play-overlay {
    opacity: 1;
  }

  .play-button {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: var(--primary-color);
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s ease, background 0.2s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }

  .play-button:hover {
    transform: scale(1.1);
    background: var(--primary-color);
    filter: brightness(1.1);
  }

  .play-button ha-icon {
    --mdc-icon-size: 24px;
    color: var(--text-primary-color, #fff);
  }

  /* Playlist Info */
  .playlist-info {
    padding: 8px;
  }

  .playlist-name {
    font-size: 13px;
    font-weight: 500;
    color: var(--primary-text-color);
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 1.3;
  }

  .playlist-meta {
    font-size: 11px;
    color: var(--secondary-text-color);
    margin-top: 2px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* Loading State */
  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 48px 24px;
    gap: 16px;
  }

  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 3px solid var(--divider-color, rgba(0, 0, 0, 0.1));
    border-top-color: var(--primary-color);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .loading-text {
    font-size: 14px;
    color: var(--secondary-text-color);
  }

  /* Error State */
  .error-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 48px 24px;
    gap: 12px;
    text-align: center;
  }

  .error-container ha-icon {
    --mdc-icon-size: 48px;
    color: var(--error-color, #db4437);
  }

  .error-message {
    font-size: 14px;
    color: var(--secondary-text-color);
  }

  /* Empty State */
  .empty-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 48px 24px;
    gap: 12px;
    text-align: center;
  }

  .empty-container ha-icon {
    --mdc-icon-size: 48px;
    color: var(--secondary-text-color);
    opacity: 0.5;
  }

  .empty-message {
    font-size: 14px;
    color: var(--secondary-text-color);
  }

  /* Config Warning */
  .config-warning {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 48px 24px;
    gap: 12px;
    text-align: center;
  }

  .config-warning ha-icon {
    --mdc-icon-size: 48px;
    color: var(--warning-color, #ffa600);
  }

  .config-warning-message {
    font-size: 14px;
    color: var(--secondary-text-color);
  }

  /* Ripple Effect */
  .ripple {
    position: relative;
    overflow: hidden;
  }

  .ripple::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
  }

  .ripple:active::after {
    width: 200px;
    height: 200px;
    opacity: 1;
    transition: width 0.3s ease, height 0.3s ease, opacity 0.3s ease;
  }

  /* ==========================================================================
     Tab Navigation
     ========================================================================== */

  .tab-bar {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 8px 4px;
    background: var(--card-background-color, var(--ha-card-background));
    border-top: 1px solid var(--divider-color, rgba(0, 0, 0, 0.1));
    flex-shrink: 0;
  }

  .tab-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    padding: 8px 16px;
    background: transparent;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s ease;
    color: var(--secondary-text-color);
    flex: 1;
    max-width: 80px;
  }

  .tab-button:hover {
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.05));
  }

  .tab-button.active {
    color: var(--primary-color);
    background: color-mix(in srgb, var(--primary-color) 15%, transparent);
  }

  .tab-button ha-icon {
    --mdc-icon-size: 24px;
  }

  .tab-button .tab-label {
    font-size: 10px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.3px;
  }

  /* Tab Content */
  .tab-content {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .tab-view {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    padding: var(--playlist-card-spacing);
  }

  .tab-view::-webkit-scrollbar {
    width: 6px;
  }

  .tab-view::-webkit-scrollbar-track {
    background: transparent;
  }

  .tab-view::-webkit-scrollbar-thumb {
    background: var(--divider-color, rgba(0, 0, 0, 0.2));
    border-radius: 3px;
  }

  .tab-view::-webkit-scrollbar-thumb:hover {
    background: var(--secondary-text-color);
  }

  /* ==========================================================================
     Now Playing View
     ========================================================================== */

  .now-playing {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    padding: 16px;
    height: 100%;
  }

  .now-playing-artwork {
    width: 100%;
    max-width: 280px;
    aspect-ratio: 1;
    border-radius: 16px;
    overflow: hidden;
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.1));
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }

  .now-playing-artwork img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .now-playing-artwork-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .now-playing-artwork-placeholder ha-icon {
    --mdc-icon-size: 80px;
    color: var(--secondary-text-color);
    opacity: 0.3;
  }

  .now-playing-info {
    text-align: center;
    width: 100%;
  }

  .now-playing-title {
    font-size: 18px;
    font-weight: 600;
    color: var(--primary-text-color);
    margin: 0 0 4px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .now-playing-artist {
    font-size: 14px;
    color: var(--secondary-text-color);
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .now-playing-idle {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    flex: 1;
    color: var(--secondary-text-color);
  }

  .now-playing-idle ha-icon {
    --mdc-icon-size: 64px;
    opacity: 0.3;
  }

  .now-playing-idle-text {
    font-size: 16px;
  }

  /* Progress Bar */
  .progress-container {
    width: 100%;
    max-width: 320px;
  }

  .progress-bar {
    width: 100%;
    height: 4px;
    background: var(--divider-color, rgba(0, 0, 0, 0.1));
    border-radius: 2px;
    overflow: hidden;
    cursor: pointer;
  }

  .progress-bar-fill {
    height: 100%;
    background: var(--primary-color);
    border-radius: 2px;
    transition: width 0.1s linear;
  }

  .progress-time {
    display: flex;
    justify-content: space-between;
    font-size: 11px;
    color: var(--secondary-text-color);
    margin-top: 4px;
  }

  /* Player Controls */
  .player-controls {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
  }

  .control-button {
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    cursor: pointer;
    color: var(--primary-text-color);
    padding: 8px;
    border-radius: 50%;
    transition: all 0.2s ease;
  }

  .control-button:hover {
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.1));
  }

  .control-button:active {
    transform: scale(0.95);
  }

  .control-button ha-icon {
    --mdc-icon-size: 28px;
  }

  .control-button.play-pause {
    background: var(--primary-color);
    color: var(--text-primary-color, #fff);
    padding: 16px;
  }

  .control-button.play-pause:hover {
    filter: brightness(1.1);
    background: var(--primary-color);
  }

  .control-button.play-pause ha-icon {
    --mdc-icon-size: 32px;
  }

  .control-button.small ha-icon {
    --mdc-icon-size: 20px;
  }

  .control-button.active {
    color: var(--primary-color);
  }

  /* Secondary Controls */
  .secondary-controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 320px;
    padding: 0 8px;
  }

  .secondary-controls-left,
  .secondary-controls-right {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  /* Volume Slider */
  .volume-container {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .volume-slider {
    width: 80px;
    height: 4px;
    -webkit-appearance: none;
    appearance: none;
    background: var(--divider-color, rgba(0, 0, 0, 0.1));
    border-radius: 2px;
    cursor: pointer;
  }

  .volume-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--primary-color);
    cursor: pointer;
  }

  .volume-slider::-moz-range-thumb {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--primary-color);
    cursor: pointer;
    border: none;
  }

  /* ==========================================================================
     Speakers View
     ========================================================================== */

  .speakers-grid {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .speaker-button {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.05));
    border: 2px solid transparent;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s ease;
    text-align: left;
  }

  .speaker-button:hover {
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.1));
  }

  .speaker-button.active {
    border-color: var(--primary-color);
    background: color-mix(in srgb, var(--primary-color) 10%, transparent);
  }

  .speaker-button ha-icon {
    --mdc-icon-size: 24px;
    color: var(--secondary-text-color);
  }

  .speaker-button.active ha-icon {
    color: var(--primary-color);
  }

  .speaker-button-info {
    flex: 1;
    min-width: 0;
  }

  .speaker-button-name {
    font-size: 14px;
    font-weight: 500;
    color: var(--primary-text-color);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .speaker-button-state {
    font-size: 12px;
    color: var(--secondary-text-color);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .speaker-button-check {
    --mdc-icon-size: 20px;
    color: var(--primary-color);
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  .speaker-button.active .speaker-button-check {
    opacity: 1;
  }

  /* ==========================================================================
     Queue View
     ========================================================================== */

  .queue-list {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .queue-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 12px;
    background: transparent;
    border-radius: 8px;
    transition: background 0.2s ease;
    cursor: pointer;
  }

  .queue-item:hover {
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.05));
  }

  .queue-item.playing {
    background: color-mix(in srgb, var(--primary-color) 10%, transparent);
  }

  .queue-item-image {
    width: 48px;
    height: 48px;
    border-radius: 6px;
    overflow: hidden;
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.1));
    flex-shrink: 0;
  }

  .queue-item-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .queue-item-info {
    flex: 1;
    min-width: 0;
  }

  .queue-item-title {
    font-size: 14px;
    font-weight: 500;
    color: var(--primary-text-color);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .queue-item-artist {
    font-size: 12px;
    color: var(--secondary-text-color);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .queue-item-playing-icon {
    --mdc-icon-size: 20px;
    color: var(--primary-color);
  }

  .queue-notice {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px;
    margin-bottom: 12px;
    background: var(--info-color, #2196f3);
    background-opacity: 0.1;
    border-radius: var(--playlist-card-border-radius);
    color: var(--primary-text-color);
    font-size: 0.85rem;
    opacity: 0.8;
  }

  .queue-notice ha-icon {
    --mdc-icon-size: 20px;
    flex-shrink: 0;
    color: var(--info-color, #2196f3);
  }

  .queue-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 48px 24px;
    color: var(--secondary-text-color);
  }

  .queue-empty ha-icon {
    --mdc-icon-size: 48px;
    opacity: 0.3;
  }
`;

export const editorStyles = css`
  :host {
    display: block;
  }

  .editor-container {
    padding: 16px;
  }

  .form-row {
    margin-bottom: 16px;
  }

  .form-row:last-child {
    margin-bottom: 0;
  }

  .form-label {
    display: block;
    font-size: 14px;
    font-weight: 500;
    color: var(--primary-text-color);
    margin-bottom: 8px;
  }

  ha-textfield,
  ha-select {
    width: 100%;
  }

  ha-formfield {
    display: block;
    margin: 8px 0;
  }

  .speakers-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 8px;
  }

  .speaker-chip {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.1));
    border-radius: 8px;
    font-size: 14px;
  }

  .speaker-chip ha-icon {
    --mdc-icon-size: 18px;
    color: var(--secondary-text-color);
  }

  .speaker-chip .remove-btn {
    margin-left: auto;
    padding: 4px;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--secondary-text-color);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .speaker-chip .remove-btn:hover {
    background: rgba(0, 0, 0, 0.1);
    color: var(--error-color, #db4437);
  }

  .add-speaker {
    display: flex;
    gap: 8px;
    margin-top: 8px;
  }

  .add-speaker ha-entity-picker {
    flex: 1;
  }

  .section-title {
    font-size: 12px;
    font-weight: 500;
    text-transform: uppercase;
    color: var(--secondary-text-color);
    margin: 24px 0 12px;
    letter-spacing: 0.5px;
  }

  .section-title:first-child {
    margin-top: 0;
  }
`;

