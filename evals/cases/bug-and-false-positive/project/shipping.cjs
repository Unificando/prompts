exports.shipping = subtotal => subtotal > 100 ? 0 : 10;
exports.quoteForPartner = subtotal => ({ shipping: exports.shipping(subtotal) });
