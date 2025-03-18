"use client";

import { useEffect, useState } from "react";
import DOMPurify from 'dompurify';
import { PLACEHOLDER_HTML, PLACEHOLDER_JS, PLACEHOLDER_CSS } from '@/constants/placeholders';
console.log(PLACEHOLDER_HTML, PLACEHOLDER_JS, PLACEHOLDER_CSS);


const normalizeHtml = (html: string) => {
  const parse = new DOMParser();
  const doc = parse.parseFromString(html, 'text/html');
  return doc.body.innerHTML.trim();
}


export default function CodeEditor() {
    const [userHtml, setUserHtml] = useState<string>(PLACEHOLDER_HTML);
    const [userCss, setUserCss] = useState<string>(PLACEHOLDER_CSS);
    const [userJs, setUserJs] = useState<string>(PLACEHOLDER_JS);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [finalCss, setFinalCss] = useState<string>('');
    const [finalHtml, setFinalHtml] = useState<string>('');
  
    const handleHtmlChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setUserHtml(e.target.value);
    };
  
    const handleCssChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setUserCss(e.target.value);
    };
  
    const handleJsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setUserJs(e.target.value);
    };
  
    useEffect(() => {
      // Sanitize the HTML input
      const sanitizedHtml = DOMPurify.sanitize(userHtml, {
        ALLOWED_TAGS: ['div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a', 'img', 'ul', 'ol', 'li', 'strong', 'em', 'code', 'pre', 'blockquote'],
        ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'id', 'style']
      });
  
      // Sanitize the CSS input
      const sanitizedCss = DOMPurify.sanitize(userCss, {
        ALLOWED_TAGS: [],
        ALLOWED_ATTR: []
      });
  
      // Sanitize the JavaScript input
      const sanitizedJs = DOMPurify.sanitize(userJs, {
        ALLOWED_TAGS: [],
        ALLOWED_ATTR: []
      });
  
      const tempHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
              ${sanitizedCss}
            </style>
          </head>
          <body>
            ${sanitizedHtml}
          </body>
          <script>
            ${sanitizedJs}
          </script>
        </html>
      `;
  
      (async () => {
        setIsProcessing(true);
        if (normalizeHtml(tempHtml) !== normalizeHtml(finalHtml) || sanitizedCss !== finalCss) {
          await new Promise(resolve => setTimeout(resolve, 1000));
          setFinalHtml(tempHtml);
          setFinalCss(sanitizedCss);
        }
        setIsProcessing(false);
      })();
    }, [userHtml, userCss, userJs]);
  
    return (
      <main className="p-4 h-screen">
        <h1 className="text-2xl text-center font-bold mb-4">Code Echo</h1>
        
        <div className="grid grid-cols-2 grid-rows-2 gap-4 h-[calc(100vh-5rem)]">
          <div className="flex flex-col">
            <label htmlFor="html-input" className="block text-sm font-medium mb-1">
              HTML
            </label>
            <textarea
              id="html-input"
              value={userHtml}
              onChange={handleHtmlChange}
              className="flex-1 p-2 border rounded font-mono resize-none"
              placeholder="Enter HTML content..."
            />
          </div>
  
          <div className="flex flex-col">
            <label htmlFor="css-input" className="block text-sm font-medium mb-1">
              CSS
            </label>
            <textarea
              id="css-input"
              value={userCss}
              onChange={handleCssChange}
              className="flex-1 p-2 border rounded font-mono resize-none"
              placeholder="Enter CSS styles..."
            />
          </div>
  
          <div className="flex flex-col">
            <label htmlFor="js-input" className="block text-sm font-medium mb-1">
              JavaScript
            </label>
            <textarea
              id="js-input"
              value={userJs}
              onChange={handleJsChange}
              className="flex-1 p-2 border rounded font-mono resize-none"
              placeholder="Enter JavaScript code..."
            />
          </div>
  
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold mb-1">Preview</h2>
            {!isProcessing ? (
              <iframe
                srcDoc={finalHtml}
                className="flex-1 border rounded"
                title="HTML Preview"
                sandbox="allow-scripts allow-modals"
              />
            ) : (
              <div className="flex-1 border rounded flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 dark:border-white"></div>
              </div>
            )}
          </div>
        </div>
      </main>
    );
  }