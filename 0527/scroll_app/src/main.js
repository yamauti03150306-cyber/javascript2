// import "./style.css";                                  ← 変更なし
// import { vote, getRates } from "./candidates.js";       ← 既存

// ⬇ resetCandidates も追加で import
import { vote, getRates, resetCandidates } from "./candidates.js";

// 既存の click ハンドラ・animateBars 等 ← 変更なし

// ⬇ 末尾に追加
const resetButton = document.querySelector("#resetBtn");
resetButton.addEventListener("click", () => {
  if (!confirm("票数をリセットしますか？")) return;
  resetCandidates();
  animateBars();          // ← リセット後にバーも初期状態へ戻す
});

// ⬇ 末尾に追加：起動時に、読み込んだ得票率でバーを描画する
animateBars();
