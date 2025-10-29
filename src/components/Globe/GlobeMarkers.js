// GlobeMarkers.js
export function createMarker(d, handleClick) {
  // Marker
  const marker = document.createElement("div");
  marker.style.cssText = `
    width:12px;
    height:12px;
    border-radius:50%;
    background:${d.color};
    border:2px solid white;
    box-shadow:0 2px 4px rgba(0,0,0,0.3);
    cursor:pointer;
    transform:translate(-50%,-50%);
    transition:transform 150ms ease, box-shadow 150ms ease;
    pointer-events:auto;
    touch-action:none;
  `;
  marker.setAttribute("role", "button");
  marker.setAttribute("aria-label", d.name);

  // Label (initially hidden, pointer-events none so it doesn't block)
  const label = document.createElement("div");
  label.textContent = d.name;
  label.style.cssText = `
    position:absolute;
    top:20px;
    left:50%;
    transform:translateX(-50%);
    background:rgba(0,0,0,0.8);
    color:white;
    padding:4px 8px;
    border-radius:4px;
    font-size:12px;
    font-weight:bold;
    white-space:nowrap;
    opacity:0;
    transition:opacity 150ms ease;
    pointer-events:none;
    user-select:none;
  `;

  // Container holds marker + label and receives pointer events
  const container = document.createElement("div");
  container.style.cssText = `
    position:relative;
    width: 1px;
    height: 1px;
    pointer-events: auto;
    touch-action: none;
  `;

  // Use pointer events — covers mouse + touch
  function onEnter() {
    marker.style.transform = "translate(-50%,-50%) scale(1.3)";
    marker.style.boxShadow = "0 6px 12px rgba(0,0,0,0.4)";
    label.style.opacity = "1";
  }
  function onLeave() {
    marker.style.transform = "translate(-50%,-50%) scale(1)";
    marker.style.boxShadow = "0 2px 4px rgba(0,0,0,0.3)";
    label.style.opacity = "0";
  }

  // Click handler
  function onClick(e) {
    e.stopPropagation?.(); // avoid propagation if available
    handleClick(d);
  }

  // Attach listeners to container (so label doesn't block pointer)
  container.addEventListener("pointerenter", onEnter, { passive: true });
  container.addEventListener("pointerleave", onLeave, { passive: true });
  container.addEventListener("click", onClick);

  container.appendChild(marker);
  container.appendChild(label);

  return container;
}
