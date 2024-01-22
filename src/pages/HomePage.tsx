const HomePage = () => {
  return (
    <div className='flex items-center justify-center flex-col pt-12 px-8 sm:px-6 gap-y-3'>      
      <h1 className='text-3xl font-bold text-gray-900'>Welcome to tic tac toe</h1>
      <h2 className='text-2xl font-semibold text-gray-700'>Rules:</h2>
      <ul className='max-w-xl space-y-2 text-gray-500 list-disc'>
        <li>The game is played on a grid that's 3 squares by 3 squares.</li>
        <li>First player is X and second player is O . Players take turns putting their marks in empty squares.</li>
        <li>The first player to get 3 of her marks in a row (up, down, across, or diagonally) is the winner.</li>
        <li>When all 9 squares are full, the game is over. If no player has 3 marks in a row, the game ends in a tie.</li>
      </ul>
    </div>
  )
}

export default HomePage