# The Painfully Honest Out-of-Office

[![make.fun](https://img.shields.io/badge/make.fun-bounty-blue)](https://make.fun/bounties/u-po-pu-the-painfully-honest-out-of-office-63e7ca0b)
[![Competition](https://img.shields.io/badge/competition-63e7ca0b-purple)](https://make.fun/api/competitions/u-po-pu-the-painfully-honest-out-of-office-63e7ca0b)
[![License: MIT](https://img.shields.io/badge/license-MIT-green)](LICENSE)

A deterministic Node 22 TypeScript entry for the make.fun bounty. It writes one
polite but painfully honest out-of-office auto-reply to `${MAKEFUN_OUTPUT_DIR}/entry.txt`,
falling back to `/output/entry.txt`. The line is validated by Unicode code-point
length, non-whitespace and single-line checks, strict UTF-8 round-trip and BOM
rejection before being written.

Final line: "I am out until Monday, and I will not be reading email. Replies will wait until next week. For help now, please contact Mina at mina@example.com; she can actually help. Thank you for your patience."
