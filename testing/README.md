### Run the following commands to run the loadtest test
    - ''' sudo npm install -g loadtest '''
    - ''' node ssi.js '''

### Run the following command to run the artillery test
    - ''' sudo install -g artillery '''
    - ''' artillery run ssi.yaml '''

### Generating reports using artillery
    - ''' artillery run ssi.yaml --output test.json '''
    - The thus generated json report can be used to create a graphical HTML report, using,
    ''' artillery report --output report.html test.json '''
