import { useState, useEffect } from "react";

import "./PageChange.scss";

export default function PageChanger({currentPage=0, maxPages=0, onPageChange=(value)=>{}}) {
  return (
    <>
      <button
        disabled={currentPage - 3 < 1}
        onClick={() => {onPageChange(currentPage - 3)}}>
        <u>&lt;&lt;</u>
      </button>
      <button
        disabled={currentPage - 1 < 1}
        onClick={() => {onPageChange(currentPage - 1)}}>
        <u>&lt;</u>
      </button>
      <span>{currentPage}</span>
      <button
        disabled={currentPage + 1 > maxPages}
        onClick={() => {onPageChange(currentPage + 1)}}>
        <u>&gt;</u>
      </button>
      <button
        disabled={currentPage + 3 > maxPages}
        onClick={() => {onPageChange(currentPage + 3)}}>
        <u>&gt;&gt;</u>
      </button>
    </>
  );
}