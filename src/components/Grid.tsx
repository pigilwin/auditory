interface GridItemsInterface {
    elements: JSX.Element[];
}

export const Grid = (items: GridItemsInterface) => {
    return (
        <div className="grid grid-cols-3 gap-4">
            {items.elements}
        </div>
    );
}