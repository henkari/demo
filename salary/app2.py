
from flask import Flask, render_template, request, redirect, url_for
import requests


app = Flask(__name__)
url = "https://holidays.abstractapi.com/v1/"


@app.route('/palkka', methods=['GET', 'POST'])

def my_form():
    
    if request.method == 'POST':
        # Handle form submission here
        # Access form data using request.form['input_name']
        input_country=request.form['country']
        input_date = request.form['date']
        input_palkka=float(request.form['palkka'])
        input_overtime=float(request.form['overtime'])
        querystring = {
    "api_key": "12fd006a888a467d935c58e822e93257",
    "country":input_country,
    "year":input_date.split('-')[0],
    "month":input_date.split('-')[1],
    "day": input_date.split('-')[2]
    }
        print(input_date.split('-')[0])    
        response=requests.get(url,params=querystring)
       
        #if response.status_code==200:
        data=response.json()
        arkipyha=len(data)
        if arkipyha>0:
            input_palkka*=2
            print(data)
        
        if input_overtime >= 1:
            input_palkka += input_palkka / 8 * 2
        # Do something with the input_value
    
        # Redirect or render a response
        return render_template('response.html',input_date=input_date, input_palkka=input_palkka, 
                               input_overtime=input_overtime, data=data)
    
    # Render the form template for GET requests
    return render_template('palkka.html')

if __name__ == '__main__':
    app.run(debug=True)
