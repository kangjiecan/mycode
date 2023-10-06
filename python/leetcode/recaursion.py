def calculate_loan(years, base_loan, annual_increment):
    if years == 0:
        return base_loan
    else:
        return calculate_loan(years - 1, base_loan * (1 + annual_increment), annual_increment)

base_loan = 100
annual_increment = 0.02  # 2% annual increment
years = 3

total_owed = calculate_loan(years, base_loan, annual_increment)
print(f"Total amount owed after {years} years: ${total_owed:.2f}")


   
    
    
    