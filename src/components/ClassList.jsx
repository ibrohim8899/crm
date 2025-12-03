export default function ClassList({ classes, classTimes }) {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Darslar va Vaqtlari</h3>
      <ul className="list-disc pl-6">
        {classes.map((cls, idx) => <li key={idx}>{cls} - {classTimes[idx]}</li>)}
      </ul>
    </div>
  );
}