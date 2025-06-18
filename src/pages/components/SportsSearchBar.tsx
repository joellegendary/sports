import React, { useEffect, useState } from "react";
import {
  TrophyIcon,
  UsersIcon,
  GlobeAltIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

interface League {
  idLeague: string;
  strLeague: string;
  strSport: string;
}

interface Team {
  idTeam: string;
  strTeam: string;
  strCountry: string;
  strSport: string;
  strLeague?: string;
  strTeamBadge?: string;
}

interface Country {
  name_en: string;
}

interface Event {
  idEvent: string;
  strEvent: string;
  dateEvent: string;
  strLeague: string;
  strVenue: string;
  strDescriptionEN?: string;
}

interface Player {
  idPlayer: string;
  strPlayer: string;
  strTeam: string;
  strNationality: string;
  strDescriptionEN?: string;
}

type NavDataType = "leagues" | "teams" | "countries" | "search" | null;

const SportsSearchBar: React.FC = () => {
  const [navDataType, setNavDataType] = useState<NavDataType>("leagues");
  const [leagues, setLeagues] = useState<League[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [searchType, setSearchType] = useState<"" | "event" | "player">("");
  const [searchInput, setSearchInput] = useState("");
  const [seasonInput, setSeasonInput] = useState("");

  useEffect(() => {
    if (navDataType === "leagues") {
      fetch("https://www.thesportsdb.com/api/v1/json/3/all_leagues.php")
        .then((res) => res.json())
        .then((data) => setLeagues(data.leagues || []))
        .catch(() => setLeagues([]));
    }
  }, [navDataType]);

  useEffect(() => {
    if (navDataType === "teams") {
      fetch(
        "https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?s=Soccer&c=Switzerland"
      )
        .then((res) => res.json())
        .then((data) => setTeams(data.teams || []))
        .catch(() => setTeams([]));
    }
  }, [navDataType]);

  useEffect(() => {
    if (navDataType === "countries") {
      fetch("https://www.thesportsdb.com/api/v1/json/3/all_countries.php")
        .then((res) => res.json())
        .then((data) => setCountries(data.countries || []))
        .catch(() => setCountries([]));
    }
  }, [navDataType]);

  const handleSearch = async () => {
    if (
      !searchType ||
      !searchInput.trim() ||
      (searchType === "event" && !seasonInput.trim())
    ) {
      alert("Please fill in all search fields");
      return;
    }

    try {
      const url =
        searchType === "event"
          ? `https://www.thesportsdb.com/api/v1/json/3/searchevents.php?e=Arsenal_vs_Chelsea&s=2016-2017`
          : `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${encodeURIComponent(
              searchInput
            )}`;

      const res = await fetch(url);
      const data = await res.json();

      if (searchType === "event") {
        setEvents(data.event || []);
        setPlayers([]);
      } else {
        setPlayers(data.player || []);
        setEvents([]);
      }

      setNavDataType("search");
    } catch {
      alert("Search failed");
    }
  };

  const navButtons = [
    {
      label: "Leagues",
      icon: <TrophyIcon className="h-5 w-5" />,
      type: "leagues",
    },
    { label: "Teams", icon: <UsersIcon className="h-5 w-5" />, type: "teams" },
    {
      label: "Countries",
      icon: <GlobeAltIcon className="h-5 w-5" />,
      type: "countries",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-gray-900 text-white flex flex-col">
      <div className="flex-grow p-6 overflow-auto">
        {/* Navbar */}
        <nav className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10 bg-green-700 p-4 rounded-lg">
          <div className="flex gap-6">
            {navButtons.map(({ label, icon, type }) => (
              <button
                key={type}
                onClick={() => setNavDataType(type as NavDataType)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 hover:bg-green-800 transition"
              >
                {icon}
                {label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <select
              value={searchType}
              onChange={(e) =>
                setSearchType(e.target.value as "event" | "player" | "")
              }
              className="px-3 py-2 rounded-md bg-white/20 text-green"
            >
              <option value="" className="text-blue-700 bg-white">
                Search Type
              </option>
              <option value="event" className="text-blue-700 bg-white">
                Event
              </option>
              <option value="player" className="text-blue-700 bg-white">
                Player
              </option>
            </select>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search..."
              className="px-3 py-2 rounded-md bg-white/20 text-white"
            />
            {searchType === "event" && (
              <input
                type="text"
                value={seasonInput}
                onChange={(e) => setSeasonInput(e.target.value)}
                placeholder="Season"
                className="px-3 py-2 rounded-md bg-white/20 text-white"
              />
            )}
            <button
              onClick={handleSearch}
              className="flex items-center gap-1 bg-green-900 px-4 py-2 rounded hover:bg-green-800"
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
              Search
            </button>
          </div>
        </nav>

        {/* Results */}
        <main className="w-full mx-auto space-y-8">
          {navDataType === "leagues" && (
            <Section
              title="Leagues"
              items={leagues}
              renderItem={(l) => (
                <div>
                  <h3 className="text-xl font-semibold">{l.strLeague}</h3>
                  <span className="inline-block bg-green-800 px-2 py-1 text-sm rounded-full mt-1">
                    {l.strSport}
                  </span>
                </div>
              )}
            />
          )}

          {navDataType === "teams" && (
            <Section
              title="Teams (Soccer, Switzerland)"
              items={teams}
              renderItem={(t) => (
                <div>
                  <div className="flex items-center gap-3">
                    {t.strTeamBadge && (
                      <img
                        src={t.strTeamBadge}
                        alt="Badge"
                        className="h-10 w-10"
                      />
                    )}
                    <h3 className="text-xl font-semibold">{t.strTeam}</h3>
                  </div>
                  <div className="mt-1 flex gap-2 text-sm">
                    <span className="bg-blue-700 px-2 py-1 rounded-full">
                      {t.strCountry}
                    </span>
                    <span className="bg-green-700 px-2 py-1 rounded-full">
                      {t.strSport}
                    </span>
                  </div>
                </div>
              )}
            />
          )}

          {navDataType === "countries" && (
            <Section
              title="Countries"
              items={countries}
              renderItem={(c) => <p>{c.name_en}</p>}
            />
          )}

          {navDataType === "search" && (
            <>
              {events.length > 0 && (
                <Section
                  title="Events"
                  items={events}
                  renderItem={(e) => (
                    <div>
                      <h3 className="text-xl font-semibold">{e.strEvent}</h3>
                      <p className="text-sm">
                        <strong>Date:</strong> {e.dateEvent} |{" "}
                        <strong>League:</strong> {e.strLeague}
                      </p>
                      <p className="text-sm mb-2">
                        <strong>Venue:</strong> {e.strVenue}
                      </p>
                      <p className="text-sm">
                        {e.strDescriptionEN || "No description."}
                      </p>
                    </div>
                  )}
                />
              )}
              {players.length > 0 && (
                <Section
                  title="Players"
                  items={players}
                  renderItem={(p) => (
                    <div>
                      <h3 className="text-xl font-semibold flex items-center gap-2">
                        {p.strPlayer}
                        <UserCircleIcon className="h-5 w-5" />
                      </h3>
                      <p className="text-sm">
                        <strong>Team:</strong> {p.strTeam} |{" "}
                        <strong>Nationality:</strong> {p.strNationality}
                      </p>
                      <p className="text-sm">
                        {p.strDescriptionEN || "No description."}
                      </p>
                    </div>
                  )}
                />
              )}
              {!events.length && !players.length && (
                <p>No search results to display.</p>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

interface SectionProps<T> {
  title: string;
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function Section<T>({ title, items, renderItem }: SectionProps<T>) {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      {items.length === 0 ? (
        <p>No data available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <article
              key={index}
              className="bg-gray-800 p-4 rounded-lg shadow-md"
            >
              {renderItem(item)}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default SportsSearchBar;
