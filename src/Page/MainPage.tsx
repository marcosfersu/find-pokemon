import { FC, useRef, useCallback } from "react";

import Header from "../Component/Header/Header";
import ListPokemon from "../Component/ListPokemon/ListPokemon";
import useListPokemon from "../hooks/useListPokemon";

import { allPokemonsProps } from "./../hooks/usePokemonPage";

export type Props = {
  action: any;
  data: {
    pokemons: allPokemonsProps;
    url: string;
  };
};

const MainPage: FC<Props> = ({ action, data }) => {
  const { pokemons, url } = data;

  const { loading, onClickHandler, urlNext, error } = useListPokemon(
    url,
    action
  );

  const observer = useRef<any>(null);
  const observerElement = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          action({ type: `SET_URL`, payload: urlNext });
        }
      });
      if (node) observer.current.observe(node);
    },
    [action, loading, urlNext]
  );

  return (
    <main>
      <Header />
      <section className="main-page-container">
        {error && console.error(error)}
        <aside className="aside-container">
          <h3>Number</h3>
          <h3>Type</h3>
        </aside>
        <ListPokemon
          pokemons={pokemons}
          onClickHandler={onClickHandler}
          observerElement={observerElement}
          loading={loading}
        />
      </section>
    </main>
  );
};

export default MainPage;
