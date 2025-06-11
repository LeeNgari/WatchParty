-- Create tables if they don't exist
CREATE TABLE IF NOT EXISTS movies (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    duration VARCHAR(50),
    release_date VARCHAR(10),
    genre TEXT[], -- PostgreSQL array for genres
    movie_url TEXT,
    display_pic TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS series (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    duration VARCHAR(50),
    release_date VARCHAR(10),
    genre TEXT[], -- PostgreSQL array for genres
    display_pic TEXT,
    episodes TEXT[], -- PostgreSQL array for episode URLs
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert Movies
INSERT INTO movies (title, description, duration, release_date, genre, movie_url, display_pic) VALUES
(
    'Snow White',
    'Princess Snow White flees the castle when the Evil Queen, in her jealousy over Snow White''s inner beauty, tries to kill her. Deep into the dark woods, she stumbles upon seven magical dwarves and a young thief named Jonathan. Together, they strive to survive the Queen''s relentless pursuit and aspire to take back the kingdom in the process…',
    '1h 49m',
    '2025',
    ARRAY['Family', 'Fantasy'],
    'https://mcloud.vvid30c.site/watch/?v21#eEZzU2FZZ3JsTVFQcUxGVE1aSW9iZ3BSS2c1T1hYcWJWT3A4eEQwejZzK3Bqa2hYTDdacDhBczlpdCtFTjdpNnJCZTB4ZFQ5aXYwPQ',
    'https://img.icdn.my.id/cover/w_1200/h_500/snow-white-1630858706.webp'
),
(
    'Captain America: Brave New World',
    'After meeting with newly elected U.S. President Thaddeus Ross, Sam finds himself in the middle of an international incident. He must discover the reason behind a nefarious global plot before the true mastermind has the entire world seeing red.',
    '1h 59m',
    '2025',
    ARRAY['Action', 'Thriller', 'Science Fiction'],
    'https://mcloud.vvid30c.site/watch/?v21#UFVXOEVHeWNmSDI3bTN6YzNJbFpPNjVpM0xPUzZuTnhFR2ZzNnJOWUorK2ZkYlAySFViVWNHeWJyeXhqeXc3b0UwSCtWMTFRTE1vPQ',
    'https://img.icdn.my.id/cover/w_1200/h_500/captain-america-brave-new-world-1630858461.jpg'
),
(
    'Bad Influence',
    'An ex-con gets a fresh start when hired to protect a wealthy heiress from a stalker — but their chemistry is hard to resist as they grow closer.',
    '1h 46m',
    '2025',
    ARRAY['Thriller', 'Drama', 'Romance'],
    'https://mcloud.vvid30c.site/watch/?v21#N202dmJmMi81eURSNXNqbDErUWZyVW1SdWJYM24yNHJaeXlDZTBzV21uMHV5MUtvYm52cDAvbTNRdzdDUkgzR1FtelRGa2s2ekNZPQ',
    'https://img.icdn.my.id/cover/w_1200/h_500/bad-influence-1630859014.webp'
),
(
    'Kryptic',
    'A woman''s search for a missing cryptzoologist leads to her own riveting cosmic quest for identity.',
    '1h 36m',
    '2024',
    ARRAY['Horror', 'Thriller', 'Drama'],
    'https://mcloud.vvid30c.site/watch/?v21#MVlVc201ZG1uNG1PV3NXbktnQW1WcFpHM0JIMmdhelJwU3Z5Y3p4aTViTGoyVTZ4NDdGRjNQYjJrR1B2bG52eWJZcmY1NU5zQUY4PQ',
    'https://img.icdn.my.id/cover/w_1200/h_500/no-image.webp'
),
(
    'Hancock: Very Nearly an Armful',
    'Hancock fan Jack Dee presents Tony Hancock: Very Nearly An Armful. Taking its title from celebrated Hancock episode The Blood Donor, this two-hour retrospective features previously unseen scripts, scrapbooks and production files belonging to the lad himself, as well as personal items such as photos and letters.',
    '1h 29m',
    '2023',
    ARRAY['Documentary'],
    'https://mcloud.vvid30c.site/watch/?v21#Ri9GcC9hSC8vc3psY2RWekVqbWE2Zi9zNVdUeGcxbmZiTWd0QVFxZGU3ZWpsOFMyYnk2WngzOC8ydndHUjJzeDV6NGVEYkZjWWNNPQ',
    'https://img.icdn.my.id/cover/w_1200/h_500/hancock-very-nearly-an-armful-1630858905.webp'
),
(
    'A Minecraft Movie',
    'Four misfits find themselves struggling with ordinary problems when they are suddenly pulled through a mysterious portal into the Overworld: a bizarre, cubic wonderland that thrives on imagination. To get back home, they''ll have to master this world while embarking on a magical quest with an unexpected, expert crafter, Steve.',
    '1h 41m',
    '2025',
    ARRAY['Family', 'Comedy', 'Adventure'],
    'https://mcloud.vvid30c.site/watch/?v21#QkFaeStXaUVTTEtoc2hRajEwNmVSYkZYQnRaZjM2ZTN4Rk5mdFFNZ1RXbXdHc3QvMFRDb0d2K2dTMTVqL0NFQW1jaU5MNVZXbFhRPQ',
    'https://img.icdn.my.id/cover/w_1200/h_500/a-minecraft-movie-1630858764.webp'
),
(
    'Side Street',
    'A struggling young father-to-be gives in to temptation and impulsively steals an envelope of money from the office of a corrupt attorney. Instead of a few hundred dollars, it contains $30,000, and when he decides to return the money things go wrong and that is only the beginning of his troubles.',
    '1h 23m',
    '1950',
    ARRAY['Thriller', 'Crime'],
    'https://mcloud.vvid30c.site/watch/?v21#MHVPSVBSNm9wZXdscXd2ZkFsbDYxV3QybHpjcTNBRXVDa1o0SnIrMkE1YkpyamllWGlrZm56a0hjb2hCWXNUUVN5R3dveDRYNC9jPQ',
    'https://img.icdn.my.id/cover/w_1200/h_500/side-street-1630858996.webp'
);

-- Insert TV Series
INSERT INTO series (title, description, duration, release_date, genre, display_pic, episodes) VALUES
(
    'The Studio - Season 1',
    'Desperate for celebrity approval, the newly appointed head of a movie studio and his executive team at Continental Studios must juggle corporate demands with creative ambitions as they try to keep movies alive and relevant.',
    '30m',
    '2025',
    ARRAY['Comedy'],
    'https://img.icdn.my.id/cover/w_1200/h_500/the-studio-season-1-1630858684.webp',
    ARRAY[
        'https://mcloud.vvid30c.site/watch/?v21#aTV4eHFEODhtdE9POXZTWHNNeUxEUEpXTklVL0ZpdUpjdEF2NFdNRTVmbWJ0aFI5cmR4TC9vcU5Jd1BjSDhTa0JxbmtLaTFza2JVPQ',
        'https://mcloud.vvid30c.site/watch/?v22#UThncnNGZC9LQ0gxRUphY1kwcnF2akl1RkNRQ2xJaGtUM2xMbmRFL25mWWdyRUQzMXRuYk9KemNBVlFyTmhXZmV0TisvV3Vnci9rPQ',
        'https://mcloud.vvid30c.site/watch/?v23#dXl4NWpWSldRUEY0VHpHUjRHV0pWYWdBZjRHTUxZSnlQYk0xbXdwQXN5cWV6NFQyMUpZNytFclpNUFBSOXlFK1ZaUWo0S1JENHJJPQ',
        'https://mcloud.vvid30c.site/watch/?v24#Mmp6MlYvU0hlcmxMVnRiaytjbHJFWWZCYmxoZFB0Y2N0bDgyMzhZMEVTd0c1YnhjZXdRWk5BNUN3V1I3OWVVTkFZa2VZS3hDZ3dBPQ',
        'https://mcloud.vvid30c.site/watch/?v25#bmhvZWI5OU1rRVB1d2l6bDA1d2orMHgyNHZkdVVSeDk4dUpyeDBDRGwvN0o5Nysxdkp0K2NLN3hBeHU2TTVwL0tTWXlhZXZ1TW1jPQ'
    ]
),
(
    'Bad Thoughts - Season 1',
    'A collection of hilariously disturbing stories that push the boundaries of decency in ways only Tom Segura could imagine.',
    '19m',
    '2025',
    ARRAY['Comedy'],
    'https://img.icdn.my.id/cover/w_1200/h_500/bad-thoughts-season-1-1630859025.jpg',
    ARRAY[
        'https://mcloud.vvid30c.site/watch/?v21#cWhFQ3Rob1M3Yng2WnJrU1JsaWFFZ3Z6UkEraWpHNUcvcEtVcXorV3kvdVhoZFAzTk9JVE1LSllZeDVoRDZya1QwMmI5dy9pNmZzPQ',
        'https://mcloud.vvid30c.site/watch/?v22#SDhDajdxS1ZZejRWeDl1NkdTQ3MwdVowMENLVmxyTlcyY05jeG5iV0xQMFVmVVZISTNpT2JrRUxML2FXRURkd25NOGNMTVRYbkRvPQ',
        'https://mcloud.vvid30c.site/watch/?v23#UjIxQmRwUXBTT1YrK3RjMndrYmdVeXNMci9uNys4dUsxZ0dTSWExRDdoOUFlY2NrZ1RndnBlbUFlb0w0MUFlNDdjY3hqS1VvZmVrPQ',
        'https://mcloud.vvid30c.site/watch/?v24#dGhuK3V6a0tOZEwxc0hpZ3draXg0Ny9XNHYwVGpWZWlyd0F5aVlwMHBpWXBEajhUTm9Da0pVUDVlRnpSMkhxdlFTem1YNmluUW9VPQ',
        'https://mcloud.vvid30c.site/watch/?v25#Rm95YTM3S1pqZGRCakRkN2U3cjVDWWU2MDFBc2lCblpqV0tvSUZZM2lyQmVJU3FoRWtLUFA0OVlhNUNmdlNnanVTdG5WUzJrb1BjPQ'
    ]
),
(
    'Sherlock & Daughter - Season 1',
    'Sherlock Holmes faces a sinister case risking friends'' lives. American Amelia joins, seeking her father after her mother''s murder. Despite differences, they solve a conspiracy and her mother''s case.',
    '50m',
    '2024',
    ARRAY['Drama', 'Mystery'],
    'https://img.icdn.my.id/cover/w_1200/h_500/sherlock-daughter-season-1-1630858883.jpg',
    ARRAY[
        'https://mcloud.vvid30c.site/watch/?v21#UnNMNktsOHl5YTc4Z2c5T0c1MXcxYVN3T2E2MG52bU9aQWt6M1lkR1FzNGV6cmZYV3BLb2V6ZndZYjRVczQ3b2JsbDhrZ3hUMHFNPQ',
        'https://mcloud.vvid30c.site/watch/?v22#WGQrZzEreHRHbmxRRkp0V0thc01LTm5JNjJUaVhjOEdOKzk1bWprVUNTLzJDS3ZsMHFJWDNtZnA4bUpFZHBSdDM2Vi95SjhiZTVjPQ',
        'https://mcloud.vvid30c.site/watch/?v23#SkVLUUxsR21oanlSTzQ1QTRwaGZmNzNRdHRzczV3Tmg0eTE0NWxweW1iNmpQRFlMZFROWGZYZjVpbHduTVl2NjRkZHFJbXhxbmFZPQ'
    ]
);

-- Verify the inserts
SELECT 'Movies inserted:' as info, COUNT(*) as count FROM movies;
SELECT 'Series inserted:' as info, COUNT(*) as count FROM series;

-- Optional: View the inserted data
-- SELECT * FROM movies ORDER BY id;
-- SELECT * FROM series ORDER BY id;
