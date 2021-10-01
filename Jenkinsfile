pipeline {
//Donde se va a ejecutar el Pipeline
  agent {
    label 'Slave4_Induccion'
  }

     triggers {
        pollSCM('* * * * *')
    }

    tools {
        jdk 'JDK8_Centos' //Verisión preinstalada en la Configuración del Master
    }
    
//Aquí comienzan los “items” del Pipeline
  stages{
      stage('Checkout') {
      steps{
        echo "------------>Checkout<------------"
        checkout([
            $class: 'GitSCM',
            branches: [[name: '*/main']],
            doGenerateSubmoduleConfigurations: false,
            extensions: [],
            gitTool: 'Default',
            submoduleCfg: [],
            userRemoteConfigs: [[
            credentialsId: 'GitHub_Richardace',
            url:'https://github.com/Richardace/adn-front-veterinary'
            ]]
        ])
      }
    }


    stage('Install') {
        steps {
            sh 'npm install'
        }
    }

    stage('Tests') {
        steps {
            sh 'ng test --watch=false --code-coverage'
        }
    }

    stage('Static Code Analysis'){
        steps{
            echo '------------>Analisis de código estático<------------'
            withSonarQubeEnv('Sonar') {
                     sh "${tool name: 'SonarScanner', type: 'hudson.plugins.sonar.SonarRunnerInstallation'}/bin/sonar-scanner -Dproject.settings=sonar-project.properties"
            }
        }
    }


    stage('Build') {
            steps {
              echo '------------>Building<------------'
              sh 'npm run build'
            }
        }
  }
  post {
    always {
      echo 'This will always run'
    }
    success {
      echo 'This will run only if successful'
     }
    failure {
      echo 'This will run only if failed'
     }
    unstable {
      echo 'This will run only if the run was marked as unstable'
    }
    changed {
      echo 'This will run only if the state of the Pipeline has changed'
      echo 'For example, if the Pipeline was previously failing but is now successful'
    }
  }
}