<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class LogJwtExceptions extends Command
{
    protected $signature = 'log:jwt-exceptions';
    protected $description = 'Log JWT exceptions to the log file and display in real-time';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $logPath = storage_path('logs/laravel.log');

        if (! File::exists($logPath)) {
            $this->info('No logs found.');
            return;
        }

        $logs = file($logPath);
        $totalLogs = count($logs);
        $lastLines = array_slice($logs, max(0, $totalLogs - 15), 15);

        $this->info('Watching JWT exceptions log...');
        foreach ($lastLines as $line) {
            $this->line($line);
        }
        // Store the last line number
        $lastLine = $totalLogs;

        // Use a while loop to keep checking the log file
        while (true) {
            // Get the current content of the log file
            $logs = file($logPath);

            // Check if new logs are available
            if (count($logs) > $lastLine) {
                // Output new logs
                for ($i = $lastLine; $i < count($logs); $i++) {
                    $this->line($logs[$i]);
                }

                // Update last line number
                $lastLine = count($logs);
            }

            // Sleep for a second before checking again
            sleep(1);
        }
    }
}
