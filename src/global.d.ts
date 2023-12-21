/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
  interface Locals {
    /**
     * The unique identifier for this request
     */
    requestId: string;
  }
  // interface Platform {}
  // interface Session {}
  // interface Stuff {}
}
