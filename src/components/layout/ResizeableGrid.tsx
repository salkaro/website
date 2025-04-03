"use client";

import React, { useState, useRef, useEffect } from "react";

interface ResizeableGridProps {
    rows: number;
    cols: number;
    cellClassName: string;
    initialWidths?: (number | string)[];
    initialHeights?: (number | string)[];
    gap?: number;
    minSize?: number;
    maxSize?: number;
    cellContent?: React.ReactNode[]; // Array of React nodes for cell content
}

const ResizeableGrid: React.FC<ResizeableGridProps> = ({
    rows,
    cols,
    cellClassName,
    initialWidths = [],
    initialHeights = [],
    gap = 12,
    minSize = 40,
    cellContent = [], // Default to an empty array
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [rowHeights, setRowHeights] = useState<number[]>([]);
    const [colWidths, setColWidths] = useState<number[]>([]);

    // Convert percentage values to pixel values based on container size
    const parseSize = (value: number | string, total: number): number => {
        if (typeof value === "string" && value.endsWith("%")) {
            return (parseFloat(value) / 100) * total;
        }
        return value as number;
    };

    // Initialize widths and heights when the component mounts or container size changes
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;

        // Calculate the total space occupied by gaps
        const totalHorizontalGap = (cols - 1) * gap;
        const totalVerticalGap = (rows - 1) * gap;

        // Adjust available space for cells
        const adjustedWidth = containerWidth - totalHorizontalGap;
        const adjustedHeight = containerHeight - totalVerticalGap;
        console.log(adjustedWidth, adjustedHeight, containerHeight)

        // If no initialWidths are provided, split evenly
        const widths =
            initialWidths.length > 0
                ? initialWidths.map((w) => parseSize(w, adjustedWidth))
                : Array(cols).fill(adjustedWidth / cols); // Split evenly if not provided

        // If no initialHeights are provided, split evenly
        const heights =
            initialHeights.length > 0
                ? initialHeights.map((h) => parseSize(h, adjustedHeight))
                : Array(rows).fill(adjustedHeight / rows); // Split evenly if not provided

        setColWidths(widths);
        setRowHeights(heights);
    }, [initialWidths, initialHeights, rows, cols, gap]);

    const handleResize = (index: number, delta: number, isVertical: boolean) => {
        if (isVertical) {
            setColWidths((prev) => {
                const updated = [...prev];
                const currentSize = updated[index];
                const adjacentSize = updated[index + 1];

                // Apply delta to the current cell
                let newSize1 = currentSize + delta;

                // Prevent the current cell from going below minSize
                if (newSize1 < minSize) {
                    newSize1 = minSize;
                }

                // Adjust the adjacent cell to maintain total size
                let newSize2 = adjacentSize - (newSize1 - currentSize);

                // Prevent the adjacent cell from going below minSize
                if (newSize2 < minSize) {
                    newSize2 = minSize;

                    // Recalculate newSize1 to maintain total size
                    newSize1 = currentSize + adjacentSize - minSize;
                    if (newSize1 < minSize) {
                        return prev; // No resizing possible
                    }
                }

                updated[index] = newSize1;
                updated[index + 1] = newSize2;

                return updated;
            });
        } else {
            setRowHeights((prev) => {
                const updated = [...prev];
                const currentSize = updated[index];
                const adjacentSize = updated[index + 1];

                // Apply delta to the current cell
                let newSize1 = currentSize + delta;

                // Prevent the current cell from going below minSize
                if (newSize1 < minSize) {
                    newSize1 = minSize;
                }

                // Adjust the adjacent cell to maintain total size
                let newSize2 = adjacentSize - (newSize1 - currentSize);

                // Prevent the adjacent cell from going below minSize
                if (newSize2 < minSize) {
                    newSize2 = minSize;

                    // Recalculate newSize1 to maintain total size
                    newSize1 = currentSize + adjacentSize - minSize;
                    if (newSize1 < minSize) {
                        return prev; // No resizing possible
                    }
                }

                updated[index] = newSize1;
                updated[index + 1] = newSize2;

                return updated;
            });
        }
    };

    return (
        <div ref={containerRef} className="relative w-full h-full overflow-hidden">
            <div
                className="grid h-full"
                style={{
                    gridTemplateRows: rowHeights.map((h) => `${h}px`).join(" "),
                    gridTemplateColumns: colWidths.map((w) => `${w}px`).join(" "),
                    gap: `${gap}px`,
                }}
            >
                {Array.from({ length: rows * cols }, (_, index) => (
                    <div
                        key={index}
                        className={cellClassName}
                        style={{ width: "100%", height: "100%" }}
                    >
                        {cellContent[index] || null}
                    </div>
                ))}
            </div>

            {/* Horizontal dividers */}
            {Array.from({ length: rows - 1 }).map((_, index) => (
                <Divider
                    key={`h-divider-${index}`}
                    index={index}
                    isVertical={false}
                    handleResize={handleResize}
                    gap={gap}
                    sizes={rowHeights}
                />
            ))}

            {/* Vertical dividers */}
            {Array.from({ length: cols - 1 }).map((_, index) => (
                <Divider
                    key={`v-divider-${index}`}
                    index={index}
                    isVertical={true}
                    handleResize={handleResize}
                    gap={gap}
                    sizes={colWidths}
                />
            ))}
        </div>
    );
};

interface DividerProps {
    index: number;
    isVertical: boolean;
    handleResize: (index: number, delta: number, isVertical: boolean) => void;
    gap: number;
    sizes: number[];
}

const Divider: React.FC<DividerProps> = ({
    index,
    isVertical,
    handleResize,
    gap,
    sizes,
}) => {
    const handleMouseDown = (e: React.MouseEvent) => {
        let lastPosition = isVertical ? e.clientX : e.clientY; // Track the last position

        const onMouseMove = (e: MouseEvent) => {
            const currentPosition = isVertical ? e.clientX : e.clientY;
            const delta = currentPosition - lastPosition; // Calculate relative delta
            handleResize(index, delta, isVertical);
            lastPosition = currentPosition; // Update last position
        };

        const onMouseUp = () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        };

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    };

    return (
        <div
            className={`absolute bg-blue-500 opacity-0 hover:opacity-100 rounded-full ${isVertical
                ? "cursor-ew-resize w-2 h-full"
                : "cursor-ns-resize h-2 w-full"
                }`}
            style={{
                top: isVertical
                    ? "0"
                    : `${sizes.slice(0, index + 1).reduce((a, b) => a + b, 0) +
                    gap * index +
                    1.5
                    }px`,
                left: isVertical
                    ? `${sizes.slice(0, index + 1).reduce((a, b) => a + b, 0) +
                    gap * index +
                    1.5
                    }px`
                    : "0",
            }}
            onMouseDown={handleMouseDown}
        ></div>
    );
};

export default ResizeableGrid;
