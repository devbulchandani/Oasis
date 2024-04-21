type Props = {
    selectedPrice?: number;
    onChange: (value?: number) => void
};

const PriceFilter = ({ selectedPrice, onChange }: Props) => {
    // Define the list of price values
    const priceValues = [500, 1000, 2000, 5000, 10000, ...Array.from({ length: 9 }, (_, i) => 20000 + i * 10000)];

    // State for search query and filtered price values

    return (
        <div>
            <h4 className="text-md font-semibold mb-2">Max Price</h4>
            <select
                className='p-2 border rounded-md w-full'
                value={selectedPrice}
                onChange={(event) => {
                    onChange(event.target.value ? parseInt(event.target.value) : undefined)
                }}
            >
                <option value="">Select Max Price</option>
                {priceValues.map((value, index) => (
                    <option key={index} value={value}>{value}</option>
                ))}
            </select>
        </div>
    );
}

export default PriceFilter;