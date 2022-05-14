import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then(resp => resp.json());

export default function TodaysEntry() {
    const { entry, error } = useSWR('/api/todays-entry', fetcher);

    if (error) {
        console.log(error);
        return <div>There&apos;s been an error loading todays entry.</div>;
    };
    if (!entry) {
        return <div>Loading todays entry..</div>;
    }
    return <p>{entry.text}</p>
};