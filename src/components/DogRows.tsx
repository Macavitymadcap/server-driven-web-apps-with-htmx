import { DogService } from '../services/dogs/dog-service';

interface DogRowsProps {
  breeds: string[];
}

const DogRow = (breed: string) => {
  const dogsService = new DogService();

  return (
    <tr>
      <td>{breed}</td>
      <td
        class="center clickable"
        hx-put={`/chapter-4/dog/${breed}`}
        hx-target="this"
        hx-indicator="#dogs-indicator"
        hx-on:click="optimisticLike(event)"
      >
        {dogsService.getHeart(dogsService.dogs.get(breed) ?? false)}
      </td>
    </tr>
  );
};

export const DogRows = ({ breeds }: DogRowsProps) => {
  return <>{breeds.map(DogRow)}</>;
};
