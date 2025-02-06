/**
 * Working with APIs
 * -----------------
 * Lesson Overview
 * -----------------
 * - Explain what an API is
 * - Explain broadly how access to an API works
 * - Explain how to fetch and extract data from an API
 * - Explain why your API request might be blocked by the browser, and how to fix this
 * 
 */

/**
 * APIs
 * =====
 * Servers that are created for serving data for external use (in websites or apps) are often referred to as APIs or 'Application Programming Interfaces'
 * 
 * APIs are accessed through URLs.
 * In most cases, one will have to create an account and request an API key from the API service before attempting to fetch data from their endpoints (specific URLs that you use to access a particular function or data within the API).
 * 
 * Fetching Data
 * ------------
 * 
 */

fetch('https://url.com/some/url')
    .then(function(response) {
        // success
    })
    .catch(function(err){
        // Error :(
    });