import React, { useState } from "react";

const Paitent = () => {
    

    return (
        <div>
<div class="overflow-x-auto">
      <table class="min-w-full bg-white">
        <thead class="whitespace-nowrap">
          <tr>
            <th class="pl-4 w-8">
              <input id="checkbox1" type="checkbox" class="hidden peer" />
              <label for="checkbox1"
                class="relative flex items-center justify-center p-0.5 peer-checked:before:hidden before:block before:absolute before:w-full before:h-full before:bg-white w-5 h-5 cursor-pointer bg-blue-500 border border-gray-400 rounded overflow-hidden">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-full fill-white" viewBox="0 0 520 520">
                  <path
                    d="M79.423 240.755a47.529 47.529 0 0 0-36.737 77.522l120.73 147.894a43.136 43.136 0 0 0 36.066 16.009c14.654-.787 27.884-8.626 36.319-21.515L486.588 56.773a6.13 6.13 0 0 1 .128-.2c2.353-3.613 1.59-10.773-3.267-15.271a13.321 13.321 0 0 0-19.362 1.343q-.135.166-.278.327L210.887 328.736a10.961 10.961 0 0 1-15.585.843l-83.94-76.386a47.319 47.319 0 0 0-31.939-12.438z"
                    data-name="7-Check" data-original="#000000" />
                </svg>
              </label>
            </th>
            <th class="p-4 text-left text-[13px] font-semibold text-slate-900">
              Company
            </th>
            <th class="p-4 text-left text-[13px] font-semibold text-slate-900">
              Status
              <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 fill-gray-500 inline cursor-pointer ml-2"
                viewBox="0 0 401.998 401.998">
                <path
                  d="M73.092 164.452h255.813c4.949 0 9.233-1.807 12.848-5.424 3.613-3.616 5.427-7.898 5.427-12.847s-1.813-9.229-5.427-12.85L213.846 5.424C210.232 1.812 205.951 0 200.999 0s-9.233 1.812-12.85 5.424L60.242 133.331c-3.617 3.617-5.424 7.901-5.424 12.85 0 4.948 1.807 9.231 5.424 12.847 3.621 3.617 7.902 5.424 12.85 5.424zm255.813 73.097H73.092c-4.952 0-9.233 1.808-12.85 5.421-3.617 3.617-5.424 7.898-5.424 12.847s1.807 9.233 5.424 12.848L188.149 396.57c3.621 3.617 7.902 5.428 12.85 5.428s9.233-1.811 12.847-5.428l127.907-127.906c3.613-3.614 5.427-7.898 5.427-12.848 0-4.948-1.813-9.229-5.427-12.847-3.614-3.616-7.899-5.42-12.848-5.42z"
                  data-original="#000000" />
              </svg>
            </th>
            <th class="p-4 text-left text-[13px] font-semibold text-slate-900">
              Type
              <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 fill-gray-500 inline cursor-pointer ml-2"
                viewBox="0 0 401.998 401.998">
                <path
                  d="M73.092 164.452h255.813c4.949 0 9.233-1.807 12.848-5.424 3.613-3.616 5.427-7.898 5.427-12.847s-1.813-9.229-5.427-12.85L213.846 5.424C210.232 1.812 205.951 0 200.999 0s-9.233 1.812-12.85 5.424L60.242 133.331c-3.617 3.617-5.424 7.901-5.424 12.85 0 4.948 1.807 9.231 5.424 12.847 3.621 3.617 7.902 5.424 12.85 5.424zm255.813 73.097H73.092c-4.952 0-9.233 1.808-12.85 5.421-3.617 3.617-5.424 7.898-5.424 12.847s1.807 9.233 5.424 12.848L188.149 396.57c3.621 3.617 7.902 5.428 12.85 5.428s9.233-1.811 12.847-5.428l127.907-127.906c3.613-3.614 5.427-7.898 5.427-12.848 0-4.948-1.813-9.229-5.427-12.847-3.614-3.616-7.899-5.42-12.848-5.42z"
                  data-original="#000000" />
              </svg>
            </th>
            <th class="p-4 text-left text-[13px] font-semibold text-slate-900">
              SKU
            </th>
            <th class="p-4 text-left text-[13px] font-semibold text-slate-900">
              Contact
            </th>
            <th class="p-4 text-left text-[13px] font-semibold text-slate-900">
              Rating
              <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 fill-gray-500 inline cursor-pointer ml-2"
                viewBox="0 0 401.998 401.998">
                <path
                  d="M73.092 164.452h255.813c4.949 0 9.233-1.807 12.848-5.424 3.613-3.616 5.427-7.898 5.427-12.847s-1.813-9.229-5.427-12.85L213.846 5.424C210.232 1.812 205.951 0 200.999 0s-9.233 1.812-12.85 5.424L60.242 133.331c-3.617 3.617-5.424 7.901-5.424 12.85 0 4.948 1.807 9.231 5.424 12.847 3.621 3.617 7.902 5.424 12.85 5.424zm255.813 73.097H73.092c-4.952 0-9.233 1.808-12.85 5.421-3.617 3.617-5.424 7.898-5.424 12.847s1.807 9.233 5.424 12.848L188.149 396.57c3.621 3.617 7.902 5.428 12.85 5.428s9.233-1.811 12.847-5.428l127.907-127.906c3.613-3.614 5.427-7.898 5.427-12.848 0-4.948-1.813-9.229-5.427-12.847-3.614-3.616-7.899-5.42-12.848-5.42z"
                  data-original="#000000" />
              </svg>
            </th>
            <th class="p-4 text-left text-[13px] font-semibold text-slate-900">
              Action
            </th>
          </tr>
        </thead>

        <tbody class="whitespace-nowrap">
          <tr class="odd:bg-blue-50">
            <td class="pl-4 w-8">
              <input id="checkbox2" type="checkbox" class="hidden peer" />
              <label for="checkbox2"
                class="relative flex items-center justify-center p-0.5 peer-checked:before:hidden before:block before:absolute before:w-full before:h-full before:bg-white w-5 h-5 cursor-pointer bg-blue-500 border border-gray-400 rounded overflow-hidden">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-full fill-white" viewBox="0 0 520 520">
                  <path
                    d="M79.423 240.755a47.529 47.529 0 0 0-36.737 77.522l120.73 147.894a43.136 43.136 0 0 0 36.066 16.009c14.654-.787 27.884-8.626 36.319-21.515L486.588 56.773a6.13 6.13 0 0 1 .128-.2c2.353-3.613 1.59-10.773-3.267-15.271a13.321 13.321 0 0 0-19.362 1.343q-.135.166-.278.327L210.887 328.736a10.961 10.961 0 0 1-15.585.843l-83.94-76.386a47.319 47.319 0 0 0-31.939-12.438z"
                    data-name="7-Check" data-original="#000000" />
                </svg>
              </label>
            </td>
            <td class="p-4 text-sm text-slate-900 font-medium">
              Louis Vuitton
            </td>
            <td class="p-4 text-sm text-slate-600 font-medium">
              <span
                class="w-[68px] block text-center font-medium py-1 border border-green-500 text-green-600 rounded text-xs">Active</span>
            </td>
            <td class="p-4 text-sm text-slate-600 font-medium">
              Bravo
            </td>
            <td class="p-4 text-sm text-slate-600 font-medium">
              8066
            </td>
            <td class="p-4 text-sm text-slate-600 font-medium">
              <div class="flex items-center cursor-pointer">
                <img src='https://readymadeui.com/profile_4.webp' class="w-7 h-7 rounded-full shrink-0" />
                <div class="ml-4">
                  <p>Gladys Jones</p>
                </div>
              </div>
            </td>
            <td class="p-4">
              <svg class="w-4 h-4 inline mr-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
                  fill="#facc15" />
              </svg>
              <svg class="w-4 h-4 inline mr-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
                  fill="#facc15" />
              </svg>
              <svg class="w-4 h-4 inline mr-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
                  fill="#facc15" />
              </svg>
              <svg class="w-4 h-4 inline mr-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
                  fill="#facc15" />
              </svg>
              <svg class="w-4 h-4 inline" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
                  fill="#facc15" />
              </svg>
            </td>
            <td class="p-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 cursor-pointer fill-gray-500 rotate-90" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="2" data-original="#000000" />
                <circle cx="4" cy="12" r="2" data-original="#000000" />
                <circle cx="20" cy="12" r="2" data-original="#000000" />
              </svg>
            </td>
          </tr>

          <tr class="odd:bg-blue-50">
            <td class="pl-4 w-8">
              <input id="checkbox3" type="checkbox" class="hidden peer" />
              <label for="checkbox3"
                class="relative flex items-center justify-center p-0.5 peer-checked:before:hidden before:block before:absolute before:w-full before:h-full before:bg-white w-5 h-5 cursor-pointer bg-blue-500 border border-gray-400 rounded overflow-hidden">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-full fill-white" viewBox="0 0 520 520">
                  <path
                    d="M79.423 240.755a47.529 47.529 0 0 0-36.737 77.522l120.73 147.894a43.136 43.136 0 0 0 36.066 16.009c14.654-.787 27.884-8.626 36.319-21.515L486.588 56.773a6.13 6.13 0 0 1 .128-.2c2.353-3.613 1.59-10.773-3.267-15.271a13.321 13.321 0 0 0-19.362 1.343q-.135.166-.278.327L210.887 328.736a10.961 10.961 0 0 1-15.585.843l-83.94-76.386a47.319 47.319 0 0 0-31.939-12.438z"
                    data-name="7-Check" data-original="#000000" />
                </svg>
              </label>
            </td>
            <td class="p-4 text-sm text-slate-900 font-medium">
              Mitsubishi
            </td>
            <td class="p-4 text-sm text-slate-600 font-medium">
              <span
                class="w-[68px] block text-center font-medium py-1 border border-yellow-500 text-yellow-600 rounded text-xs">Pending</span>
            </td>
            <td class="p-4 text-sm text-slate-600 font-medium">
              Bravo
            </td>
            <td class="p-4 text-sm text-slate-600 font-medium">
              9055
            </td>
            <td class="p-4 text-sm text-slate-600 font-medium">
              <div class="flex items-center cursor-pointer">
                <img src='https://readymadeui.com/profile_3.webp' class="w-7 h-7 rounded-full shrink-0" />
                <div class="ml-4">
                  <p>Jorge Black</p>
                </div>
              </div>
            </td>
            <td class="p-4">
              <svg class="w-4 h-4 inline mr-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
                  fill="#facc15" />
              </svg>
              <svg class="w-4 h-4 inline mr-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
                  fill="#facc15" />
              </svg>
              <svg class="w-4 h-4 inline mr-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
                  fill="#facc15" />
              </svg>
              <svg class="w-4 h-4 inline mr-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
                  fill="#CED5D8" />
              </svg>
              <svg class="w-4 h-4 inline" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
                  fill="#CED5D8" />
              </svg>
            </td>
            <td class="p-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 cursor-pointer fill-gray-500 rotate-90" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="2" data-original="#000000" />
                <circle cx="4" cy="12" r="2" data-original="#000000" />
                <circle cx="20" cy="12" r="2" data-original="#000000" />
              </svg>
            </td>
          </tr>

          <tr class="odd:bg-blue-50">
            <td class="pl-4 w-8">
              <input id="checkbox4" type="checkbox" class="hidden peer" />
              <label for="checkbox4"
                class="relative flex items-center justify-center p-0.5 peer-checked:before:hidden before:block before:absolute before:w-full before:h-full before:bg-white w-5 h-5 cursor-pointer bg-blue-500 border border-gray-400 rounded overflow-hidden">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-full fill-white" viewBox="0 0 520 520">
                  <path
                    d="M79.423 240.755a47.529 47.529 0 0 0-36.737 77.522l120.73 147.894a43.136 43.136 0 0 0 36.066 16.009c14.654-.787 27.884-8.626 36.319-21.515L486.588 56.773a6.13 6.13 0 0 1 .128-.2c2.353-3.613 1.59-10.773-3.267-15.271a13.321 13.321 0 0 0-19.362 1.343q-.135.166-.278.327L210.887 328.736a10.961 10.961 0 0 1-15.585.843l-83.94-76.386a47.319 47.319 0 0 0-31.939-12.438z"
                    data-name="7-Check" data-original="#000000" />
                </svg>
              </label>
            </td>
            <td class="p-4 text-sm text-slate-900 font-medium">
              IBM
            </td>
            <td class="p-4 text-sm text-slate-600 font-medium">
              <span
                class="w-[68px] block text-center font-medium py-1 border border-green-500 text-green-600 rounded text-xs">Active</span>
            </td>
            <td class="p-4 text-sm text-slate-600 font-medium">
              Gold
            </td>
            <td class="p-4 text-sm text-slate-600 font-medium">
              7011
            </td>
            <td class="p-4 text-sm text-slate-600 font-medium">
              <div class="flex items-center cursor-pointer">
                <img src='https://readymadeui.com/profile_2.webp' class="w-7 h-7 rounded-full shrink-0" />
                <div class="ml-4">
                  <p>Evan Flores</p>
                </div>
              </div>
            </td>
            <td class="p-4">
              <svg class="w-4 h-4 inline mr-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
                  fill="#facc15" />
              </svg>
              <svg class="w-4 h-4 inline mr-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
                  fill="#facc15" />
              </svg>
              <svg class="w-4 h-4 inline mr-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
                  fill="#facc15" />
              </svg>
              <svg class="w-4 h-4 inline mr-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
                  fill="#facc15" />
              </svg>
              <svg class="w-4 h-4 inline" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
                  fill="#CED5D8" />
              </svg>
            </td>
            <td class="p-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 cursor-pointer fill-gray-500 rotate-90" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="2" data-original="#000000" />
                <circle cx="4" cy="12" r="2" data-original="#000000" />
                <circle cx="20" cy="12" r="2" data-original="#000000" />
              </svg>
            </td>
          </tr>

          <tr class="odd:bg-blue-50">
            <td class="pl-4 w-8">
              <input id="checkbox5" type="checkbox" class="hidden peer" />
              <label for="checkbox5"
                class="relative flex items-center justify-center p-0.5 peer-checked:before:hidden before:block before:absolute before:w-full before:h-full before:bg-white w-5 h-5 cursor-pointer bg-blue-500 border border-gray-400 rounded overflow-hidden">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-full fill-white" viewBox="0 0 520 520">
                  <path
                    d="M79.423 240.755a47.529 47.529 0 0 0-36.737 77.522l120.73 147.894a43.136 43.136 0 0 0 36.066 16.009c14.654-.787 27.884-8.626 36.319-21.515L486.588 56.773a6.13 6.13 0 0 1 .128-.2c2.353-3.613 1.59-10.773-3.267-15.271a13.321 13.321 0 0 0-19.362 1.343q-.135.166-.278.327L210.887 328.736a10.961 10.961 0 0 1-15.585.843l-83.94-76.386a47.319 47.319 0 0 0-31.939-12.438z"
                    data-name="7-Check" data-original="#000000" />
                </svg>
              </label>
            </td>
            <td class="p-4 text-sm text-slate-900 font-medium">
              Starbucks
            </td>
            <td class="p-4 text-sm text-slate-600 font-medium">
              <span
                class="w-[68px] block text-center font-medium py-1 border border-yellow-500 text-yellow-600 rounded text-xs">Pending</span>
            </td>
            <td class="p-4 text-sm text-slate-600 font-medium">
              Alfa
            </td>
            <td class="p-4 text-sm text-slate-600 font-medium">
              6605
            </td>
            <td class="p-4 text-sm text-slate-600 font-medium">
              <div class="flex items-center cursor-pointer">
                <img src='https://readymadeui.com/profile_5.webp' class="w-7 h-7 rounded-full shrink-0" />
                <div class="ml-4">
                  <p>Jennie Cooper</p>
                </div>
              </div>
            </td>
            <td class="p-4">
              <svg class="w-4 h-4 inline mr-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
                  fill="#facc15" />
              </svg>
              <svg class="w-4 h-4 inline mr-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
                  fill="#facc15" />
              </svg>
              <svg class="w-4 h-4 inline mr-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
                  fill="#CED5D8" />
              </svg>
              <svg class="w-4 h-4 inline mr-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
                  fill="#CED5D8" />
              </svg>
              <svg class="w-4 h-4 inline" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
                  fill="#CED5D8" />
              </svg>
            </td>
            <td class="p-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 cursor-pointer fill-gray-500 rotate-90" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="2" data-original="#000000" />
                <circle cx="4" cy="12" r="2" data-original="#000000" />
                <circle cx="20" cy="12" r="2" data-original="#000000" />
              </svg>
            </td>
          </tr>

          <tr class="odd:bg-blue-50">
            <td class="pl-4 w-8">
              <input id="checkbox6" type="checkbox" class="hidden peer" />
              <label for="checkbox6"
                class="relative flex items-center justify-center p-0.5 peer-checked:before:hidden before:block before:absolute before:w-full before:h-full before:bg-white w-5 h-5 cursor-pointer bg-blue-500 border border-gray-400 rounded overflow-hidden">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-full fill-white" viewBox="0 0 520 520">
                  <path
                    d="M79.423 240.755a47.529 47.529 0 0 0-36.737 77.522l120.73 147.894a43.136 43.136 0 0 0 36.066 16.009c14.654-.787 27.884-8.626 36.319-21.515L486.588 56.773a6.13 6.13 0 0 1 .128-.2c2.353-3.613 1.59-10.773-3.267-15.271a13.321 13.321 0 0 0-19.362 1.343q-.135.166-.278.327L210.887 328.736a10.961 10.961 0 0 1-15.585.843l-83.94-76.386a47.319 47.319 0 0 0-31.939-12.438z"
                    data-name="7-Check" data-original="#000000" />
                </svg>
              </label>
            </td>
            <td class="p-4 text-sm text-slate-900 font-medium">
              The Walt Disney
            </td>
            <td class="p-4 text-sm text-slate-600 font-medium">
              <span
                class="w-[68px] block text-center font-medium py-1 border border-yellow-500 text-yellow-600 rounded text-xs">Pending</span>
            </td>
            <td class="p-4 text-sm text-slate-600 font-medium">
              Gold
            </td>
            <td class="p-4 text-sm text-slate-600 font-medium">
              9956
            </td>
            <td class="p-4 text-sm text-slate-600 font-medium">
              <div class="flex items-center cursor-pointer">
                <img src='https://readymadeui.com/profile_6.webp' class="w-7 h-7 rounded-full shrink-0" />
                <div class="ml-4">
                  <p>Philip Steward</p>
                </div>
              </div>
            </td>
            <td class="p-4">
              <svg class="w-4 h-4 inline mr-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
                  fill="#facc15" />
              </svg>
              <svg class="w-4 h-4 inline mr-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
                  fill="#facc15" />
              </svg>
              <svg class="w-4 h-4 inline mr-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
                  fill="#facc15" />
              </svg>
              <svg class="w-4 h-4 inline mr-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
                  fill="#CED5D8" />
              </svg>
              <svg class="w-4 h-4 inline" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
                  fill="#CED5D8" />
              </svg>
            </td>
            <td class="p-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 cursor-pointer fill-gray-500 rotate-90" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="2" data-original="#000000" />
                <circle cx="4" cy="12" r="2" data-original="#000000" />
                <circle cx="20" cy="12" r="2" data-original="#000000" />
              </svg>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>
    );}

export default Paitent;