import { useState } from 'react';
import axios from 'axios';
import { Character } from './Character.js';

import { useQuery } from 'react-query';

export function Characters() {
    const [page, setPage] = useState(1);

    const { data, status } = useQuery(
        ['characters', page],
        async ({ queryKey }) => {
            const response = await axios.get(
                `https://rickandmortyapi.com/api/character?page=${queryKey[1]}`
            );
            return response.data;
        }
    );

    if (status === 'loading') {
        return <div>Loading...</div>;
    }
    if (status === 'error') {
        return <div>Error...</div>;
    }

    return (
        <>
            <div className="characters">
                {data.results.map((character) => (
                    <Character character={character} />
                ))}
            </div>
            <div className="button-area">
                <button onClick={() => setPage(page - 1)} disabled={page === 1}>
                    Previous
                </button>
                <button
                    onClick={() => setPage(page + 1)}
                    disabled={!data.info.next}
                >
                    Next
                </button>
            </div>
        </>
    );
}
