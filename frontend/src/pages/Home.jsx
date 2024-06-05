import React from 'react';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center background text-txt pt-20">
      {/* Header */}
      <header className="text-center">
        <h1 className="text-2xl md:text-4xl font-bold mb-4">Welcome to Trackit</h1>
        <p className="md:text-lg text-txt-depressed mb-8">Simplify your financial tracking with ease</p>
      </header>
      
      {/* Features Section */}
      <section className="flex flex-col md:flex-row items-center justify-center bg-base shadow-lg rounded-lg p-8 max-w-4xl w-5/6">
        {/* Feature 1: Income Tracking */}
        <div className="flex flex-col items-center justify-center mb-8 md:mb-0 md:mr-8">
          <img src="https://www.svgrepo.com/show/522612/money-receive.svg" alt="Income Icon" className="w-24 h-24 mb-4 invert" />
          <h2 className="text-xl font-semibold mb-2">Track Income</h2>
          <p className="text-txt-depressed text-center">Effortlessly monitor your income sources and earnings.</p>
        </div>
        
        {/* Feature 2: Expense Tracking */}
        <div className="flex flex-col items-center justify-center mb-8 md:mb-0 md:mx-8">
          <img src="https://www.svgrepo.com/show/522614/money-send.svg" alt="Expense Icon" className="w-24 h-24 mb-4 invert" />
          <h2 className="text-xl font-semibold mb-2 ">Manage Expenses</h2>
          <p className="text-txt-depressed text-center">Keep track of your spending and expenses to better manage your finances.</p>
        </div>
        
        {/* Feature 3: Investment Tracking */}
        <div className="flex flex-col items-center justify-center mb-8 md:mb-0 md:ml-8">
          <img src="https://www.svgrepo.com/show/497148/graph.svg" alt="Investment Icon" className="w-24 h-24 mb-4 invert" />
          <h2 className="text-xl font-semibold text-center">Monitor Investments</h2>
          <p className="text-txt-depressed text-center">Stay updated on your investment portfolio and performance.</p>
        </div>
        
        {/* Feature 4: Recurring Transactions */}
        <div className="flex flex-col items-center justify-center md:ml-8">
          <img src="https://www.svgrepo.com/show/451232/recurrence.svg" alt="Recurring Icon" className="w-24 h-24 mb-4 invert" />
          <h2 className="text-xl font-semibold text-center">Automate Recurring Transactions</h2>
          <p className="text-txt-depressed text-center">Set up recurring transactions to streamline your financial management process.</p>
        </div>
      </section>
      
      {/* Call-to-Action Section */}
      <section className="text-center mt-12">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">Ready to take control of your finances?</h2>
        <p className="md:text-lg text-txt-depressed mb-8">Sign up now and start tracking your income, expenses, investments, and more.</p>
      </section>
    </div>
  );
};

export default Home;