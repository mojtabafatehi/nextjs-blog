interface MetaItemProps {
  label: string;
  value: string;
}

export default function MetaItem({ label, value }: MetaItemProps) {
  return (
    <p className="text-xs text-gray-300 mt-4">
      <span className="bg-gray-700 text-white px-2 ml-2 rounded-full">
        {label}
      </span>{" "}
      {value}
    </p>
  );
}
