import { getPersons } from "@/app/actions/persons";

export default async function ListPersons() {
  const persons = await getPersons();
  return (
    <div>
      {persons.length ? (
        persons.data.map((person) => person.full_name)
      ) : (
        <span>وجود ندارد</span>
      )}
    </div>
  );
}
