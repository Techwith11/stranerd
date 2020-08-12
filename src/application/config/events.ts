import Vue from 'vue'

export const EventBus = new Vue()

// @ts-ignore
window.Fire = EventBus
